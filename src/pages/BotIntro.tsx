import axios from 'axios';
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const uploadUrl = 'http://localhost:5000/uploads/';

interface ImageData {
  _id: string,
  filename: string;
  originalname: string;
  uploadDate: string; // Ensure the server sends this information
}

const AboutBot = () => {
  // State to hold the list of admins
  const [botIntro, SetBotIntro] = useState('');
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to store selected image

  // Fetch admin data from the API
  useEffect(() => {
    axios.get('/api/getImages')
      .then(response => {
        setImageData(response.data.images);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
    axios.get('/api/getW_Address')
      .then(res => SetBotIntro(res.data.about_bot))
      .catch(error => {
        console.error('Error fetching data:', error);
        toast.error("Error fetching admin data!");  // Optionally, show an error toast to the user
      });
    axios.get('/api/getbotIntroImage')
      .then(response => {
        setSelectedImage(response.data.image);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const handleImageClick = (filename: string, _id: string) => {
    setSelectedImage(filename); // Set the selected image
    axios.post('/api/setCurrentbotImg', { _id })
      .then(response => {
        if (response.data.message) {
          // setImageData(prevData => [...prevData, response.data.image]);
          toast.success(`It's set correctly image.`, {
            duration: 4000,
            position: 'top-right',
            // Customize styles
            style: {
              background: '#333',
              color: '#fff',
            },
            // Add custom icon
            icon: '👏',
          });
        } else {
          console.log(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className='p-3'>
            <div className="flex flex-col gap-5.5 sm:flex-row">
              <div className='w-full flex items-center'>
                <label
                  className="block text-sm font-medium text-black dark:text-white text-center pr-3"
                  htmlFor="about_iki"
                >
                  About ikigai funny bot
                </label>
                <textarea
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  id="about_iki"
                  placeholder="0" rows={3}
                  value={botIntro}
                  onChange={(e) => SetBotIntro(e.target.value)}
                />
              </div>
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 items-center"
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    const result = await axios.post('/api/SetBotIntro', {botIntro});
                    SetBotIntro(result.data.about_bot);
                    toast.success(`It's set correctly.`,{
                      duration: 4000,
                      position: 'top-right',
                      // Customize styles
                      style: {
                        background: '#333',
                        color: '#fff',
                      },
                      // Add custom icon
                      icon: '👏',
                    });
                  } catch (error) {
                    console.error('Error:', error);
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
          {/* Table */}
          <div className="rounded-sm border border-stroke bg-white px-5 pt-3 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
            <div className="flex flex-col">
              {/* Render Images with Single Selection */}
              <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto h-auto">
                {imageData.map((image) => (
                  <div
                    key={image.filename}
                    className={`relative cursor-pointer ${selectedImage === image.filename ? 'border-4 border-blue-500' : 'border-2 border-transparent'} rounded-lg`}
                    onClick={() => handleImageClick(image.filename, image._id)}
                  >
                    <img
                      src={uploadUrl + image.filename}
                      alt={image.originalname}
                      className="w-full h-auto rounded-lg"
                    />
                    {selectedImage === image.filename && (
                      <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-50 rounded-lg"></div>
                    )}
                    {/* Image Name with Word Wrap */}
                    <p className="mt-2 text-center text-sm text-gray-700 dark:text-gray-300 break-words max-w-full">
                      {image.originalname}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Table */}
        </div>
      </div>
    </>
  );
};

export default AboutBot;
