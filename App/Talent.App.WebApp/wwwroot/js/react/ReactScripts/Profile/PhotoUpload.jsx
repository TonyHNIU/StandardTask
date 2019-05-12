/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        this.selectFileToUpload = this.selectFileToUpload.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);
        this.maxFileSize = 2097152;
        this.acceptedFileType = ["image/gif", "image/jpeg", "image/png", "image/jpg"];

        this.state = {
            selectedFile: null,
            selectedFileName: null,
            imageSrc: null
        }
    };


    selectFileToUpload() {
        document.getElementById('selectFile').click();
    }


    fileSelectedHandler(event) {

        if (event.target.files[0].size > this.maxFileSize || this.acceptedFileType.indexOf(event.target.files[0].type) == -1) {

            TalentUtil.notification.show("Max file size is 2 MB and supported file types are *.jpg, *.jpeg, *.png, *.gif", "error", null, null);
            this.setState({
                imageSrc: null,
                selectedFile: null
            })
        }
        else {

            this.setState({
                selectedFile: event.target.files[0],
                imageSrc: window.URL.createObjectURL(event.target.files[0])
            })
        }
    }

    fileUploadHandler(event) {

        let data = new FormData();
        data.append('file', this.state.selectedFile);

        if (this.state.selectedFile == null) {
            TalentUtil.notification.show("Please select Image file to upload", "error", null, null);
            return false;
        }

        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: this.props.savePhotoUrl,
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            type: "POST",
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.success) {
                    this.props.updateProfileData({
                        profilePhotoUrl: res.newFileUrl
                    })
                    this.setState({
                        imageSrc: null,
                        selectedFile: null
                    });
                    TalentUtil.notification.show("Profile Photo has been updated", "success", null, null);
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null);
                }
            }.bind(this),
            error: function (res, status, error) {
                //Display error
                TalentUtil.notification.show("There is an error when updating Profile Photo - " + error, "error", null, null);
            }
        });
    }

    render() {

        let showProfileImg;

        if (this.state.imageSrc != null) {
            showProfileImg =
                <div>
                    <img
                        style={{ height: 112, width: 112 }}
                        className="ui small circular image uploader"
                        src={this.state.imageSrc}
                        alt="Image Not Found"
                        onClick={this.selectFileToUpload}
                    />
                    <div className="ui teal button" onClick={this.fileUploadHandler}>
                        <i className="small upload icon"></i>Upload
                    </div>
                </div>;
        } else if (this.props.imageId != "" && this.props.imageId != undefined) {
            showProfileImg =
                <img
                    style={{ height: 112, width: 112 }}
                    className="ui small circular image uploader"
                    src={this.props.imageId}
                    alt="Image Not Found"
                    onClick={this.selectFileToUpload}
                />;
        }
        else {
            showProfileImg = <i className="huge circular camera retro link icon uploader" onClick={this.selectFileToUpload}></i>;
        }

        return (

            <section>
                <div>
                    <label htmlFor="profile_uploader" className="profile-photo">
                        {showProfileImg}
                    </label>

                    <input id="selectFile"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={this.fileSelectedHandler}
                        accept="image/*"
                    />
                </div>
            </section>

        )
    }
}
