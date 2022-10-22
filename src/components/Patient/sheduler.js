import React, {Component} from 'react';
import './shedulerStyles.css';
import TimeRangeSlider from 'react-time-range-slider';
import DatePicker from 'react-date-picker';
import { Range } from 'react-range';
import Moment from 'moment';
import Logout from '../logout';
import axios from 'axios';

class Sheduler extends Component {
    constructor(props) {
        super(props);
        this.featureRef = React.createRef();
        this.changeStartHandler = this.changeStartHandler.bind(this);
        this.timeChangeHandler = this.timeChangeHandler.bind(this);
        this.changeCompleteHandler = this.changeCompleteHandler.bind(this);
        this.state = {
            time: {
                start: "00:00",
                end: "23:59"
            },
            date:"",
            values: [50],
            response : [],
            generatedResults:false
        }
    }

    changeStartHandler(time) {
        console.log("Start Handler Called", time);
    }

    timeChangeHandler(time) {
        this.setState({
            time: time
        },()=>{console.log(time)});
    }

    changeCompleteHandler(time) {
        console.log("Complete Handler Called", time);
    }

    checkData = async () => {
        console.log("Appointment Date", Moment(this.state.date).format('YYYY:MM:DD'))
        console.log("Appointment Time From " + this.state.time.start + " To " + this.state.time.end)
        console.log("Maximum Doctor Distance ", this.state.values[0])
        const response = await axios({
            method: 'post',
            url: 'https://carrie-shedule.herokuapp.com/getClinicians',
            data: {
                "start": this.state.time.start+":00",
                "end": this.state.time.end+":00",
                "date":  Moment(this.state.date).format('YYYY:MM:DD'),
                "distance": this.state.values[0]
            }
        });
        console.log("RESPONSE ",response.data.available_clinicians)
        this.setState({response:response.data.available_clinicians,generatedResults:true})
    }
    render() {
        return (
            <div className="mainContainer">
                <h1 className="title">Project Carrie</h1>
                <h4 className="description">You can check available doctors from here.</h4>
                <h4 className="description">When do you want meet your doctor</h4>
                <DatePicker
                    dateFormat="yyyy/MM/dd"
                    className="datePicker"
                    onChange={
                        (e)=>{this.setState({date:e})}
                    }
                    value={this.state.date}
                />
                <div className="timeInput">
                    <h4 className="description">Schedule your appointment.</h4>
                    <TimeRangeSlider
                        disabled={false}
                        format={24}
                        maxValue={"23:59"}
                        minValue={"00:00"}
                        name={"time_range"}
                        onChangeStart={this.changeStartHandler}
                        onChangeComplete={this.changeCompleteHandler}
                        onChange={this.timeChangeHandler}
                        step={15}
                        value={this.state.time}
                    />
                    <h4 className="displayTime">You are scheduled for {this.state.time.start} - {this.state.time.end}</h4>
                </div>
                <h4 className="description">Select the distance : {this.state.values}</h4>
                <h5></h5>
                <Range
                    step={0.1}
                    min={0}
                    max={100}
                    values={this.state.values}
                    onChange={(values) => this.setState({ values })}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '6px',
                                width: '100%',
                                backgroundColor: '#ccc'
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '20px',
                                width: '20px',
                                borderRadius:'40px',
                                borderColor:'red',
                                backgroundColor: 'red'
                            }}
                        />
                    )}
                />
                <div className="checkButton" onClick={this.checkData}>
                    <p className="checkText">Check</p>
                </div>

                <div className="predictedDoctorsContainer">
                    {this.state.generatedResults ?
                        <h1>The generated list of doctors suitable for your appointment</h1>
                        :
                        <h1></h1>
                    }
                    {
                        
                        this.state.response.map((value,index)=>{
                            return(
                                <h4>{value}</h4>
                            )
                        })
                    }
                </div>
                <Logout/>
            </div>
        );
    }
}

export default Sheduler;