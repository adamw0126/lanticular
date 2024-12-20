import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

export default function ContactForm() {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [company, setCompany] = React.useState();
  const [message, setMessage] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isReturn, setIsReturn] = React.useState(false);

  const handleSubmitContact = async () => {
    if (!name || !email || !message) {
      return toast.error('Enter your information correctly.');
    }

    setIsLoading(true); // Set loading to true before API call

    const formData = { name, email, company, message };
    try {
      const response = await axios.post('/api/contactUs', formData);
      const res = response.data;

      if (res.message === 'invalid_email_type')
        return toast.error('Invalid email type.');

      if (res.message === 'notExistUser') {
        toast.error('Not exist user.');
      } else if (res.message === 'success') {
        setIsReturn(true);
        toast.success('The message was transmitted accurately.');
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error('Error submitting form. Please try again later.');
    } finally {
      setIsLoading(false); // Set loading to false after API call (success or failure)
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: 'auto',
        backgroundColor: '#161523', // Dark background color
        padding: '0 20px',
        borderRadius: 2,
        marginTop: 5,
        paddingBottom: 2,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
      }}
      noValidate
      autoComplete="off"
    >
      {
        !isReturn ? <>
          <TextField
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            size='small'
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            sx={{
              input: {
                color: 'white', // Text color for inputs
              },
              label: { color: 'white !important' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#616161', // Border color for inputs
                },
                '&:hover fieldset': {
                  borderColor: '#9e9e9e', // Hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ffffff', // Focused border color
                },
              },
            }}
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            size='small'
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            sx={{
              input: { color: 'white' },
              label: { color: 'white !important' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#616161' },
                '&:hover fieldset': { borderColor: '#9e9e9e' },
                '&.Mui-focused fieldset': { borderColor: '#ffffff' },
              },
            }}
          />
          <Typography variant="body2" sx={{ color: 'white', mb: 1, fontFamily: 'Satoshi, sans-serif', fontSize: 11 }}>
            If you're contacting us regarding your account, please provide the email
            associated with it.
          </Typography>
          <TextField
            onChange={(e) => setCompany(e.target.value)}
            margin="normal"
            size='small'
            fullWidth
            id="company"
            label="Company"
            name="company"
            sx={{
              input: { color: 'white' },
              label: { color: 'white !important' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#616161' },
                '&:hover fieldset': { borderColor: '#9e9e9e' },
                '&.Mui-focused fieldset': { borderColor: '#ffffff' },
              },
            }}
          />
          <TextField
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            size='small'
            required
            fullWidth
            id="message"
            label="Message"
            name="message"
            multiline
            rows={4}
            className='custom-input'
            sx={{
              input: { color: 'white' },
              label: { color: 'white !important' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#616161' },
                '&:hover fieldset': { borderColor: '#9e9e9e' },
                '&.Mui-focused fieldset': { borderColor: '#ffffff' },
              },
            }}
          />
          {/* Add a submit button here */}
          <button
            className="modal-ok"
            style={{ height: 45, fontWeight: '400', marginTop: 5, backgroundColor: isLoading ? '#ccc' : '' }} // Disable button styling during loading
            onClick={handleSubmitContact}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" /> // Show loading indicator
            ) : (
              'Send'
            )}
          </button>
        </>
        : <>
          <div style={{paddingTop:'10px', fontWeight:400, lineHeight:1.3}}>
            Thank you! Your message has been sent.<br/>
            We appreciate you reaching out to Lenticular.<br/>
            Our team will review your inquiry and get back to you promptly.
          </div>
        </>
      }
    </Box>
  );
}
