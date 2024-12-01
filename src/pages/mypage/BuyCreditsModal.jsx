import React, { useState } from 'react';
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

function BuyCreditsModal({ open, setOpen, SetCurrentCredits }) {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    //   const [open, setOpen] = useState(false);
    const [quantity1, setQuantity1] = useState(1);
    const [quantity2, setQuantity2] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const increment = (setter, value) => setter(value + 1);
    const decrement = (setter, value) => setter(value > 0 ? value - 1 : 0);

    const totalCredits = 1200 * quantity1 + 500 * quantity2;
    const totalPrice = (10 * quantity1 + 5 * quantity2).toFixed(2);

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
                    {/* Header with Title and Close Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">Buy Credits</Typography>
                        <IconButton onClick={handleClose} style={{color:'white'}}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Credit Options */}
                    <div className='modal-body'>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={8}>
                                <Typography>1,200 &nbsp;&nbsp;<span className='bonustip'>Bonus Credits</span></Typography>
                                <Typography variant="body2" color="white">
                                    $10.00
                                </Typography>
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button onClick={() => decrement(setQuantity1, quantity1)}>-</Button>
                                <Typography>{quantity1}</Typography>
                                <Button onClick={() => increment(setQuantity1, quantity1)}>+</Button>
                            </Grid>

                            <Grid item xs={8}>
                                <Typography>500 Credits</Typography>
                                <Typography variant="body2" color="white">
                                    $5.00
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


                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ flex: 1, mr: 1 }}
                            onClick={buyCredits}
                        >
                            Buy
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
            </Modal>
        </div>
    );
}

export default BuyCreditsModal;
