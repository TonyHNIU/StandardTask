import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        const details = props.status

        this.state = {
            jobStatus: details.status,
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status != this.props.status) {
            this.setState({
                jobStatus: this.props.status.status,
            })
        }
    }

    handleChange(val) {
        //console.log("value", val)
        //console.log("jobStatus", this.props.status)
        if (val == 'later') {
            this.setState({
                jobStatus: val
            })
        } else {
            this.setState({
                jobStatus: val,
            },
                this.saveStatus
            )
        }

    }

    render() {
        //console.log("props", this.props.status)
        //console.log("this.state.jobStatus", this.state.jobStatus)
        return (
            <React.Fragment>
                <div className='row'>
                    <div className="ui sixteen wide column">
                        <div>
                            <div className='field'>
                                <b>Current Status</b>
                            </div>
                            <div className='field'>
                                <Checkbox
                                    radio
                                    label='Actively looking for a job'
                                    name='checkboxRadioGroup'
                                    value='active'
                                    checked={this.state.jobStatus === 'active'}
                                    onChange={this.handleChange.bind(this, 'active')}
                                />
                            </div>
                            <div className='field'>
                                <Checkbox
                                    radio
                                    label='Not looking for a job at the moment'
                                    name='checkboxRadioGroup'
                                    value='inactive'
                                    checked={this.state.jobStatus === 'inactive'}
                                    onChange={this.handleChange.bind(this, 'inactive')}
                                />
                            </div>
                            <div className='field'>
                                <Checkbox
                                    radio
                                    label='Currently employed but open to offers'
                                    name='checkboxRadioGroup'
                                    value='employed'
                                    checked={this.state.jobStatus === 'employed'}
                                    onChange={this.handleChange.bind(this, 'employed')}
                                />
                            </div>
                            <div className='field'>
                                <Checkbox
                                    radio
                                    label='Will be available on later date'
                                    name='checkboxRadioGroup'
                                    value='later'
                                    checked={this.state.jobStatus === 'later'}
                                    onChange={this.handleChange.bind(this, 'later')}
                                />
                            </div>

                        </div>

                    </div>

                </div>     
            </React.Fragment>
        )
    }
}