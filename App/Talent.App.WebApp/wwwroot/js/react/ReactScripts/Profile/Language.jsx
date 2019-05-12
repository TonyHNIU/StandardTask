/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Icon, Modal } from 'semantic-ui-react';

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        const languages = props.languageData

        this.state = {
            showAddNew: false,
            showUpdate: false,
            updateId: "",
            newLanguages: languages,
            language: "",
            level: ""

        }

        this.showAddNew = this.showAddNew.bind(this)
        this.closeAddNew = this.closeAddNew.bind(this)

        this.showUpdate = this.showUpdate.bind(this)
        this.closeUpdate = this.closeUpdate.bind(this)

        this.onChangeText = this.onChangeText.bind(this)
        this.onChangeDropdown = this.onChangeDropdown.bind(this)

        this.saveLanguage = this.saveLanguage.bind(this)
        this.updateLanguage = this.updateLanguage.bind(this)

        this.deleteLanguage = this.deleteLanguage.bind(this)
    }

    showAddNew() {
        const details = this.props.languageData
        this.setState({
            showAddNew: true,
            newLanguages: details,
            language: "",
            level: ""
        })
    }

    closeAddNew() {
        this.setState({
            showAddNew: false,
        })
    }

    showUpdate(id, lang, lev) {
        const details = this.props.languageData
        this.setState({
            showUpdate: true,
            newLanguages: details,
            updateId: id,
            language: lang,
            level: lev
        })
    }

    closeUpdate() {
        this.setState({
            showUpdate: false,
        })
    }

    onChangeText() {
        var data = event.target.value;
        this.setState({
            language: data
        })
    }

    onChangeDropdown() {
        var data = event.target.value;
        this.setState({
            level: data
        })
    }

    deleteLanguage(id) {
        let temp = this.props.languageData
        //console.log("temp", temp)
        const index = temp.findIndex(obj => obj.id == id)
        temp.splice(index, 1)
        //console.log("delete", temp)
        this.props.updateProfileData(temp)
        //this.closeUpdate()
    }

    updateLanguage() {
        let arr = this.state.newLanguages
        //console.log("arr", arr)
        const index = arr.findIndex(obj => obj.id == this.state.updateId)
        arr[index].name = this.state.language
        arr[index].level = this.state.level
        //console.log("update", arr)
        this.props.updateProfileData(arr)
        this.closeUpdate()
    }

    saveLanguage() {
        //console.log("this.state.language", this.state.language)
        //console.log("this.state.level", this.state.level)
        let name = this.state.language
        let level = this.state.level
        this.state.newLanguages.push({ name, level })
        var data = Object.assign([], this.state.newLanguages)
        //console.log("save", data)
        this.props.updateProfileData({ "languages": data })
        this.closeAddNew()
    }

    render() {
        const xtr = this.props.languageData
        //console.log("languageData", this.props.languageData)
        //console.log("newLanguages", xtr)
        let options = null
        if (this.state.showAddNew) {
            options = <div className="row">
                <div className="ui five wide column">
                    <input placeholder="Add Language" value={this.state.language} onChange={this.onChangeText} />
                </div>
                <div className="ui five wide column">
                    <select className="ui right labeled dropdown" placeholder="Level" onChange={this.onChangeDropdown}>
                        <option value="">Language Level</option>
                        <option value="Basic">Basic</option>
                        <option value="Conversational">Conversational</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Native/Bilingual">Native/Bilingual</option>
                    </select>
                </div>
                <div className="ui four wide column">
                    <button type="button" className="ui teal button" onClick={this.saveLanguage}>Add</button>
                    <button type="button" className="ui button" onClick={this.closeAddNew}>Cancel</button>
                </div>
            </div>
        }

        //console.log("this.state.language", this.state.language)
        let list = this.props.languageData;
        //console.log("list", list)
        let tableData = null;
        if (list != "") {
            tableData = list.map(entry =>
                <Table.Row key={entry.id}>
                    {this.state.showUpdate && entry.id == this.state.updateId
                        ? <React.Fragment>
                            <Table.Cell className="five wide column">
                                <input placeholder="Update Language" value={this.state.language} onChange={this.onChangeText} />
                            </Table.Cell>
                            <Table.Cell className="five wide column">
                                <select className="ui right labeled dropdown" placeholder="Level" value={this.state.level} onChange={this.onChangeDropdown}>
                                    <option value="Basic">Basic</option>
                                    <option value="Conversational">Conversational</option>
                                    <option value="Fluent">Fluent</option>
                                    <option value="Native/Bilingual">Native/Bilingual</option>
                                </select>
                            </Table.Cell>
                            <Table.Cell className="six wide column">
                                <button type="button" className="ui basic blue button" onClick={this.updateLanguage}>Update</button>
                                <button type="button" className="ui basic red button" onClick={this.closeUpdate}>Cancel</button>
                            </Table.Cell>
                        </React.Fragment>
                        : <React.Fragment>
                            <Table.Cell className="five wide column">{entry.name}</Table.Cell>
                            <Table.Cell className="five wide column">{entry.level}</Table.Cell>
                            <Table.Cell className="six wide column" textAlign="right">
                                <Icon name="pencil" onClick={this.showUpdate.bind(this, entry.id, entry.name, entry.level)} />
                                <Icon name="cancel" onClick={this.deleteLanguage.bind(this, entry.id)} />
                            </Table.Cell>
                        </React.Fragment>
                    }

                </Table.Row>
            )
        }

        return (
            <React.Fragment>
                {options}
                <div className="ui sixteen wide column">

                    <Table striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Language</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
                                <Table.HeaderCell><button type="button" className="ui right floated teal button" onClick={this.showAddNew}>+ Add New</button></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {tableData}
                        </Table.Body>
                    </Table>
                </div>

            </React.Fragment>
        )

    }
}