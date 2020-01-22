import React, { Component } from 'react';
import {ExcelRenderer, OutTable} from 'react-excel-renderer';
import {postData} from './BackendAccessor'

class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {file: ""};
        this.openFile= this.openFile.bind(this);
        this.fileUpload = React.createRef()
        this.submitdata = this.submitdata.bind(this);
    }
    openFile(e) {
        console.log(e)
        const form = e.target.files[0]
        ExcelRenderer(form,(err,resp) => {
            if(err){
                console.log(err);
            }
            else{
                this.setState({
                    file: form,
                    cols: resp.cols,
                    rows: resp.rows
                })
            }
        })

        // this.setState(state => ({
        //     file: this.fileUpload.files[0]
        // }), () => {console.log(this.state.file)});
        console.log("file upload")
        console.log(this.state);
    }
    render() {
        console.log(this.state)
        let table=null;if(this.state.rows){table=(<OutTable data={this.state.rows} columns={this.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />)}
        const list = this.state.errors;
        console.log('list', list)
        let errors = null;
        if (list) {
          errors = (
            <div>
                  <h1 style={{ color: 'red'}} >Errors</h1>
                  <h5>
                    <ul>
                      {list && list.map(function(item) {
                        return <li key ={item}>{item}</li>;
                      })}
                    </ul>
                    </h5>
            </div>

          )
        }
        return (
            <div>
            <input id={"excel"} label='Upload File' type="file" className="file-uploader"
              onChange={this.openFile} ref={(ref) => this.fileUpload = ref}>
              </input>
             {table}
             <button onClick = {this.submitdata}>
                Submit
              </button>
              {errors}
              </div>
        )}
      submitdata(){
        const formData = new FormData();
        formData.append ('file',this.state.file)
        formData.append('filename','file.xlsx')
        postData ("allValidationChecks", formData).then((result)=> {
          return result.json()
        }).then(data=>{
          console.log(data, 'hello')
          this.setState({
            errors: data
          })
        }).catch((error)=>{
          console.log(error)
        })
    }
  }
  //<h1 style = {{ color: 'red'}} >Errors</h1>

 export default FileUploader;
