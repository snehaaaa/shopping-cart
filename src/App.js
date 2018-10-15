import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import logo1 from './user1.png';
import logo2 from './user2.png';
import logo3 from './user3.png';
import logo4 from './user4.png'
import Select from 'react-select';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader} from 'material-ui/Card';
import {Grid, Cell } from 'react-mdl';
import 'react-select/dist/react-select.css';

const muiTheme = getMuiTheme({ userAgent: false });
export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            subTotal:'',
            estimatedTotal:'',
            promotinalcode:5.90.toFixed(2),
            open: false,
            id:'',
            img:'',
            style_id:'',
            shirt_Material:'',
            Color:'',
            Size:'',
            Qty:'',
            price:'',
            value:'one',
            dataList:[],
            listArr:{
                "res_data":[  
                      {  
                        "id":"1",
                         "style_id":"MS13KT1906",
                         "img":logo1,
                         "shirt_Material":"COTTON TSHIRT",
                         "Color":"Blue",
                         "Size":"S",
                         Qty:1,
                         price:11
                      },
                      {  
                         "id":"2",
                         "img":logo2,
                         "style_id":"MS13KT1906",
                         "shirt_Material":"PRINT GIRLS TEE",
                         "Color":"Pink",
                         "Size":"S",
                         Qty:1,
                          price:17
                      },
                      {  
                         "id":"3",
                        "img":logo3,
                         "style_id":"MS13KT1906",
                         "shirt_Material":"FLOWER PATTERN SHIRT",
                         "Color":"Blue",
                         "Size":"S",
                         Qty:1,
                          price:9
                      },
                      {  
                         "id":"4",
                        "img":logo4,
                         "style_id":"MS13KT1906",
                         "shirt_Material":"CHECK PATTERN SHIRT",
                         "Color":"Red",
                         "Size":"S",
                         Qty:1,
                          price:22
                      }

                ]
            }
        }
        this._handleClose = this._handleClose.bind(this);
        this._handleTitleChange = this._handleTitleChange.bind(this);
    }
    componentWillMount(){   
        let dataListArr=this.state.listArr;
        let listArr = dataListArr.res_data;
        this.setState({
            dataList:listArr
        })
        this._simpleArraySum(listArr);
    }
    componentWillUnmount(){
    }

    _simpleArraySum(listArr) {
        let {subTotal,promotinalcode} = this.state;
        var sum = 0;
        for(var i = 0;i < listArr.length;i++){
            sum += (listArr[i].price);       
        }  
        this.setState({
            subTotal:(sum ? sum : subTotal).toFixed(2),
            estimatedTotal:(sum - promotinalcode).toFixed(2)
        })  
    }
    _removeList(id){
        let arr = this.state.dataList;
        for(var i = 0; i < arr.length; i++) {
            if(arr[i].id === id) {
                arr.splice(i, 1);
                 this._simpleArraySum(arr);
            }
        }
    }
    _handleOpen(data) {
        this.setState({
            open: true, 
            id:data.id,
            img:data.img,
            style_id:data.style_id,
            shirt_Material:data.shirt_Material,
            Color:data.Color,
            Size:data.Size,
            Qty:data.Qty,
            price:(data.price).toFixed(2)
        });
    };
    _setList(){
         const { dataList } = this.state;
            if (dataList && dataList.length) {
                return dataList.map((dataList, i) => {
                    let userId = dataList.id;
                    return(
                        <Grid  key={userId} style={{borderBottom:(i+1)%4 !== 0 && (i+1) !== dataList.length ? '1px solid #eef2f7' : ''}}>
                            <Cell col={1}>
                               <img className="images" alt= {userId} src={dataList.img} />
                            </Cell>
                            <Cell col={2} style={{display:'block',color:'darkgray'}}>
                                <div style={{fontSize:'12px',color:'gray'}}>{dataList.shirt_Material}</div>
                                <div style={{fontSize:'12px'}}>{`Style#`} : {dataList.style_id}</div>
                                <div style={{fontSize:'12px'}}>{`Color`} : {dataList.Color}</div>
                                <div style={{paddingTop:15}}><span style={{borderRight:'1px solid darkgrey',margin: '0px 5px 0px 0px',cursor: 'pointer',paddingRight: 4}} onClick={this._handleOpen.bind(this,dataList)} > EDIT </span><span style={{borderRight:'1px solid darkgrey',margin: '0px 5px 0px 0px',cursor: 'pointer',paddingRight: 4}} onClick={this._removeList.bind(this,userId)}> X REMOVE </span> <span> SAVE FOR LATER </span></div>
                            </Cell>
                            <Cell col={3}>
                              
                            </Cell>
                            <Cell col={2} style={{display:'block'}}>
                               <div style={{fontSize:'12px',color:'gray'}}>{dataList.Size}</div>
                            </Cell>
                             <Cell col={2} style={{display:'block'}}>
                               <div style={{fontSize: 12,width: 48,border:'1px solid rgb(238, 242, 247)',height: 24,textAlign: 'center',color:'gray'}}>{dataList.Qty}</div>
                            </Cell>
                            <Cell col={2} style={{display:'block',color:'gray'}}>
                               <div style={{fontSize:'12px'}}><span> $ </span><span>{(dataList.price).toFixed(2)}</span></div>
                            </Cell>
                          
                        </Grid>
                    );
                });
            }

            return (<div style={{padding:30}}>You cart is empty</div>);
    }
    _handleClose(){
        this.setState({
            open:false
        })
    }
    _handleTitleChange (value) {
        this.setState({
            Size:value ? value.value : ''
        })
    }
    renderValue(option) {
        return <div style={{ color: option.color ,opacity:option.opacity}}>{option.label}</div>;
    }
    _handleeditData(id){
        let arr = this.state.dataList;
        let {Qty,Color,Size} = this.state;
       for(var i = 0; i < arr.length; i++) {
            if(arr[i].id === id) {
                arr[i].price = (Qty * arr[i].price) / arr[i].Qty;
                arr[i].Qty = Qty;
                arr[i].Size = Size;
                arr[i].Color = Color;
                this._simpleArraySum(arr);
            }
        }
        this._handleClose();
    }
    handleChange(event) {
        let Value = event.target.value ;
        this.setState({Qty: Value});
    }
    _handleColorChange(value){
        this.setState({
            Color:value
        })
    }
  render() {
    let {dataList,subTotal,open,shirt_Material,price,style_id,Color,Qty,id,Size,img,promotinalcode,estimatedTotal} = this.state;
        let options = [
            { value: 'S', label: 'small',color: '#54698d' ,opacity:1},
            { value: 'M', label: 'medium', color: '#54698d' ,opacity:1},
            {value: 'L', label: 'large', color: '#54698d' ,opacity:1},
        ];
    return (
         <MuiThemeProvider muiTheme={muiTheme}>
             <div style={{fontSize:10}}>
                    <Card>
                        <CardHeader title="YOUR SHOPPING CART" titleStyle={{fontSize:24}} subtitle="If the card is completely empty then we shall again add back the products for you"/>
                    <div>
                        <Grid style={{borderTop:'1px solid rgb(238, 242, 247)',borderBottom:'4px solid rgb(238, 242, 247)',color:'darkgray'}}>
                            <Cell col={2}>
                               <div style={{fontSize:'12px',}}><span>{dataList && dataList.length ? dataList.length : 0}</span><span> ITEMS </span></div>
                            </Cell>
                            <Cell col={2}>
                               <div style={{fontSize:'12px'}}><span>  </span><span>  </span></div>
                            </Cell>
                            <Cell col={2}>
                              
                            </Cell>
                            <Cell col={2}>
                               <div style={{fontSize:'12px'}}><span> </span><span> SIZE </span></div>
                            </Cell>
                             <Cell col={2}>
                               <div style={{fontSize:'12px'}}><span> </span><span> QTY </span></div>
                            </Cell>
                            <Cell col={2}>
                               <div style={{fontSize:'12px'}}><span> </span><span> PRICE </span></div>
                            </Cell>
                              
                        </Grid>
                        <div>{this._setList()}</div>
                        <div>
                            <Grid style={{borderTop:'5px solid #eef2f7',color:'darkgray'}}>
                                <Cell col={2} style={{display:'block'}}>
                                    <div>Need help or have queries?</div>
                                    <div>Call customer service at</div>
                                    <div>1-800-555-555</div>
                                    <div>Chat with one of our stylist</div>
                                    <div>See return or exchange policy</div>
                                </Cell>
                                <Cell col={2}></Cell>
                                <Cell col={8}>
                                    <Grid style={{borderBottom:'2px solid #eef2f7',margin:0,padding:0}}>
                                        <Cell col={6}>
                                            <div>ENTER PROMOTION CODE OR GIFT CARD</div>
                                        </Cell>
                                        <Cell col={6} style={{alignItems:'end',display: 'flex',justifyContent:'flex-end'}}>
                                            <div><span style={{border:'1px solid',padding: '5px 80px 5px 5px',borderColor:'#eef2f7'}}>AJ10</span><span style={{border: '1px solid',padding: '5px 5px 5px 5px',margin: 4,borderColor: '#eef2f7'}}>APPLY</span></div>
                                        </Cell>
                                    </Grid>
                                    <Grid  style={{margin:0,padding:0}}>
                                        <Cell col={6}>
                                            <div>SUB TOTAL</div>
                                        </Cell>
                                        <Cell col={6} style={{alignItems:'end',display: 'flex',justifyContent:'flex-end'}}>
                                            $ {subTotal}
                                        </Cell>
                                    </Grid>
                                    <Grid style={{margin:0,padding:0}}>
                                        <Cell col={6}>
                                            <div>PROMOTION CODE AJ10 APPLIED</div>
                                        </Cell>
                                        <Cell col={6} style={{alignItems:'end',display: 'flex',justifyContent:'flex-end'}}>
                                            $ {promotinalcode}
                                        </Cell>
                                    </Grid>
                                    <Grid style={{borderBottom:'2px solid #eef2f7',margin:0,padding:0}}>
                                        <Cell col={6} style={{display:'block'}}>
                                            <div>ESTIMATED SHIPPING*</div>
                                             <div>Your quantity for free shopping because your order is over $50</div>
                                        </Cell>
                                        <Cell col={6} style={{alignItems:'end',display: 'flex',justifyContent:'flex-end'}}>
                                           FREE
                                        </Cell>
                                    </Grid>
                                     <Grid style={{margin:0,padding:0,borderBottom:'5px solid #eef2f7'}}>
                                        <Cell col={6} style={{display:'block'}}>
                                            <div>ESTIMATED TOTAL</div>
                                            <div>Tax will be applied during checkout</div>
                                        </Cell>
                                        <Cell col={6} style={{alignItems:'end',display: 'flex',justifyContent:'flex-end'}}>
                                           $ {estimatedTotal}
                                        </Cell>
                                    </Grid>
                                    <Grid className = "mdl-grid mdl-cell mdl-cell--12-col" style={{margin:0,padding:0}}>
                                        <Cell col={6}>
                                            
                                        </Cell>
                                        <Cell col={6} style={{alignItems:'end',display: 'flex',justifyContent:'flex-end'}}>
                                            <div>
                                                <span style={{textDecoration:'underline',margin:'0px 10px'}}>CONTINUE SHIPPING</span>
                                                <span>
                                                    <RaisedButton
                                                        label="CHECKOUT"
                                                        primary={true}
                                                        buttonStyle={{backgroundColor:'blue'}}
                                                    />
                                                 </span>
                                            <div>Secure checkout.Payment is always safe & secure</div>
                                            </div>
                                        </Cell>
                                    </Grid>
                                </Cell>
                          
                            </Grid>
                        </div>
                   </div>
                    <Dialog
                      title={<div><i className="material-icons" onClick={this._handleClose.bind(this)} style={{padding:10,cursor:'pointer'}}
                                >close</i></div>}
                      titleStyle={{textAlign:'right',padding:0}}
                      modal={false}
                      contentStyle={{width:600}}
                      open={open}
                      onRequestClose={this._handleClose}>
                        <div className = "mdl-grid mdl-cell mdl-cell--12-col" style={{margin: 0,padding: 0}}>
                            <div className = "mdl-grid mdl-cell mdl-cell--6-col" style={{borderTop:'8px solid #eef2f7',margin: 0,padding: 0}}>
                            </div>
                            <div className = "mdl-grid mdl-cell mdl-cell--6-col" style={{margin: 0,padding: 0}}>
                            </div>
                        </div>
                        <div className = "mdl-grid mdl-cell mdl-cell--12-col" style={{margin: 0,padding: 0}}>
                            <div className = "mdl-grid mdl-cell mdl-cell--6-col" style={{justifyContent: 'center',margin: 0,padding: 0,textAlign: 'center'}}>
                               <div>
                               <div style={{fontSize: '16px',marginTop: '20px',color:'#000000c4'}}>{shirt_Material}</div>
                               <div style={{fontSize: '24px',marginTop: '6px',color:'#000000c4'}}><span> $ </span><span>{price}</span></div>
                               <div style={{fontSize: '15px',marginTop: '6px',color:'darkgray'}}>{style_id}</div>
                               <div style={{display: 'flex',justifyContent:'center'}}>
                                <div style={{height: '24px',cursor: 'pointer',width: '36px',backgroundColor: 'red',margin: '4px',border:Color ==='Red' ? '4px solid lightgrey' : null}} onClick={this._handleColorChange.bind(this,'Red')}></div>
                                 <div style={{height: '24px',width: '36px',cursor: 'pointer',backgroundColor: 'pink',margin: '4px',border:Color === 'Pink' ? '4px solid lightgrey' : null}} onClick={this._handleColorChange.bind(this,'Pink')}></div>
                                  <div style={{height: '24px',width: '36px',cursor: 'pointer',backgroundColor: 'blue',margin: '4px',border:Color === 'Blue' ? '4px solid lightgrey' : null}} onClick={this._handleColorChange.bind(this,'Blue')}></div> </div>
                               <div style={{fontSize:'12px',color:'darkgray'}}>{`Color`} :{Color}</div>
                               <div style={{display:'flex',justifyContent:'center',marginTop:10}}>
                                    <div>
                                       <Select
                                           name="form-field-name"
                                           placeholder="Select"
                                           value={Size}
                                           className="trvl-txtStyle-ss" 
                                           onChange={this._handleTitleChange}
                                           clearable={false}
                                           searchable={false}
                                           options={options}
                                           valueRenderer={this.renderValue.bind(this)}
                                          />
                                    </div>
                                   <div style={{marginLeft:10}}>
                                    <input 
                                        type="text" 
                                        style={{width:44,cursor: 'pointer',height:32,border:'1px solid #e8edf4',borderRadius:'4px',textAlign:'center'}}
                                        className="inputfieldcss" 
                                        value={Qty}  
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                               </div>
                                <div style={{margin:10}}>
                                    <RaisedButton
                                        label="Edit"
                                        primary={true}
                                        buttonStyle={{backgroundColor:'blue',width:'120%'}}
                                        onClick={this._handleeditData.bind(this,id)}
                                     />
                                </div>
                                <div style={{color: 'black',cursor: 'pointer',textDecoration: 'underline'}}>Check Product Details</div>
                            </div>
                            </div>
                            <div className = "mdl-grid mdl-cell mdl-cell--6-col" style={{margin: 0,padding: 0}}>
                               <img alt="checkout" src={img} style={{width:'100%',height:'100%'}} />
                            </div>
                        </div>

                    </Dialog>
                   </Card>
                </div>
      </MuiThemeProvider>
    );
  }
}

