import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
    Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import TollIcon from '@mui/icons-material/Toll';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Checkout from './checkout';
import Paypal from './paypal';

function BuyCreditsModal({ open, setOpen, SetCurrentCredits }) {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    //   const [open, setOpen] = useState(false);
    const [quantity1, setQuantity1] = useState(1);
    const [quantity2, setQuantity2] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isPayMode, setIsPayMode] = useState(false);
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [standardCredit, setStandardCredit] = useState(0);
    const [bonusCredit, setBonusCredit] = useState(0);
    const [standardPrice, setStandardPrice] = useState(0);
    const [bonusPrice, setBonusPrice] = useState(0);

    useEffect(() => {
        return () => {
            axios.get('/api/getSettingData')
            .then(response => {
                const { setting } = response.data;
                console.log('setting ===>', setting)
                setStandardCredit(setting.common.creditCnt);
                setStandardPrice(setting.common.price);
                setBonusCredit(setting.bonus.creditCnt);
                setBonusPrice(setting.bonus.price);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }, []);

    const increment = (setter, value) => setter(value + 1);
    const decrement = (setter, value) => setter(value > 0 ? value - 1 : 0);

    const totalCredits = 1200 * quantity1 + 500 * quantity2;
    const totalPrice = (10 * quantity1 + 5 * quantity2).toFixed(2);

    const paymentDetails = () => setIsPayMode(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const clearModal = () => {
        setIsPayMode(false);
        handleClose();
    }

    const buyCredits = async () => {
        try {
            console.log('total ===>', totalCredits, totalPrice);
            const res = await axios.post('/api/buyCredits', { who: user.admin._id, reqCredits: totalCredits, reqPrice: totalPrice });
            let _data = res.data;
            console.log(_data)
            if(totalCredits == 0 && Number(totalPrice) == 0){
                return toast.error('No Credits count has been set.');
            }
            if(_data.message == 'small_than'){
                toast.error(`There is not enough money in your wallet.\nThe score you currently have are worth $${_data.current_score}.`);
                handleClose();
            } else {
                if(_data.message == 'success'){
                    SetCurrentCredits(_data.admin.credits);
                    toast.success('Purchased correctly.');
                    localStorage.setItem('userInfo', JSON.stringify(_data));
                }
            }
            handleClose();
        } catch (error) {
            console.error("Error updating user Credits", error);
        }
    }

    return (
        <div>
            <Modal open={open} onClose={handleClose} className='modal-style'>
                {
                    !isPayMode ?
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6">Buy Credits</Typography>
                            <IconButton onClick={handleClose} style={{color:'white'}}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <div className='modal-body'>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8}>
                                    <Typography>{bonusCredit} &nbsp;&nbsp;<span className='bonustip'>Bonus Credits</span></Typography>
                                    <Typography variant="body2" color="white">
                                        {`$${bonusPrice}.00`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button onClick={() => decrement(setQuantity1, quantity1)}>-</Button>
                                    <Typography>{quantity1}</Typography>
                                    <Button onClick={() => increment(setQuantity1, quantity1)}>+</Button>
                                </Grid>
    
                                <Grid item xs={8}>
                                    <Typography>{standardCredit} Credits</Typography>
                                    <Typography variant="body2" color="white">
                                        {`$${standardPrice}.00`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button onClick={() => decrement(setQuantity2, quantity2)}>-</Button>
                                    <Typography>{quantity2}</Typography>
                                    <Button onClick={() => increment(setQuantity2, quantity2)}>+</Button>
                                </Grid>
                            </Grid>
                            {/* Summary Section */}
                            <Box sx={{ mt: 3, mb: 2, textAlign: 'center' }} className='modal-footer'>
                                <Typography variant="h6">
                                    {totalCredits} Credits
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    ${totalPrice}
                                </Typography>
                            </Box>
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ flex: 1, mr: 1 }}
                                onClick={paymentDetails}
                            >
                                Continue
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ flex: 1 }}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                    : <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <div className='payMode-main'>
                            <div className='payMode-header'>
                                <Button className='modalhead-btn' onClick={() => setIsPayMode(false)}><ArrowBackIosOutlinedIcon /></Button>
                                <div>Payment Details</div>
                                <Button className='modalhead-btn' onClick={clearModal}><ClearOutlinedIcon /></Button>
                            </div>
                            <div className='payMode-body'>
                                <div className='flex justify-between' style={{padding:'10px 0'}}>
                                    <div>
                                        <h5 style={{fontSize:16,fontWeight:400}}>Description</h5>
                                        <div><TollIcon /> {`${totalCredits} Credits`}</div>
                                    </div>
                                    <div>
                                        <h5 style={{fontSize:16,fontWeight:400,textAlign:'right'}}>Amount</h5>
                                        <div>{`$${totalPrice} Credits`}</div>
                                    </div>
                                </div>
                                <div className='flex justify-between' style={{padding:'10px 0'}}>
                                    <div>
                                        <h5 style={{fontSize:14,fontWeight:400}}>Tax</h5>
                                        <div>{`Total due`}</div>
                                    </div>
                                    <div>
                                        <h5 style={{fontSize:14,fontWeight:400,textAlign:'right'}}>$0</h5>
                                        {`$${totalPrice}`}
                                    </div>
                                </div>

                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    variant={isMobile ? 'scrollable' : 'fullWidth'}
                                    scrollButtons={isMobile ? 'auto' : false}
                                >
                                    <Tab label="Card" {...a11yProps(0)} />
                                    <Tab label="Paypal" {...a11yProps(1)} />
                                    {/* <Tab label="Activity" {...a11yProps(2)} /> */}
                                </Tabs>
                                <CustomTabPanel value={value} index={0}>
                                    <Checkout totalPrice={totalPrice} buyCredits={buyCredits} />
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1}>
                                    <Paypal totalPrice={totalPrice} buyCredits={buyCredits} />
                                </CustomTabPanel>
                                
                                <div className='checkout'>
                                    <div className="payment-form">
                                        {/* <div className="form-group">
                                        <label htmlFor="cardNumber">Card number</label>
                                        <div className="input-container">
                                            <input
                                            type="text"
                                            id="cardNumber"
                                            placeholder="1234 1234 1234 1234"
                                            maxLength="19"
                                            />
                                            <div className="card-icons">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" />
                                            <img src="/american-express-svgrepo-com.svg" alt="Amex" />
                                            <img src="discover-3-svgrepo-com.svg" alt="Discover" />
                                            </div>
                                        </div>
                                        </div> */}

                                        {/* <div className="form-group">
                                        <div className="input-row">
                                            <div className="input-wrapper">
                                            <label htmlFor="expirationDate">Expiration date</label>
                                            <input type="text" id="expirationDate" placeholder="MM / YY" />
                                            </div>
                                            <div className="input-wrapper">
                                            <label htmlFor="securityCode">Security code</label>
                                            <input type="text" id="securityCode" placeholder="CVC" maxLength="4" />
                                            <span className="cvc-icon">💳</span>
                                            </div>
                                        </div>
                                        </div> */}

                                        {/* <div className="form-group">
                                        <label htmlFor="country">Country</label>
                                        <select id="country">
                                            {
                                                countries.map(val => (<option value={val} key={val}>{val}</option>))
                                            }
                                        </select>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className='payMode-footer'>
                                <div style={{margin:'8px 3px'}}>
                                </div>
                            </div>
                        </div>
                    </Box>
                }
            </Modal>
        </div>
    );
}

export default BuyCreditsModal;

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
