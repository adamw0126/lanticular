import Breadcrumb from '../components/Breadcrumb';
import axios from 'axios';
import { useState, ChangeEvent, useEffect } from "react";
import { toast } from 'react-hot-toast';

const uploadUrl = 'http://localhost:5000/uploads/';

interface ImageData {
  _id: string,
  filename: string;
  originalname: string;
  uploadDate: string; // Ensure the server sends this information
}

const Images = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to store selected image
  const [sortOption, setSortOption] = useState<string>('uploadDate');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    axios.get('/api/getImages')
      .then(response => {
        setImageData(response.data.images);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
    axios.get('/api/getCurrentImage')
      .then(response => {
        setSelectedImage(response.data.image);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    if (file.size / 1024 / 1024 > 20) {
      toast.error('File size must be smaller than 20MB.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(response.data.message);
      setImageData(prevData => [...prevData, response.data.image]);
    } catch (error) {
      toast.error('File upload failed');
    }
  };

  // Handle single image selection
  const handleImageClick = (filename: string, _id: string) => {
    setSelectedImage(filename); // Set the selected image
    axios.post('/api/setCurrentImage', { _id })
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

  // Sorting and filtering images
  const sortedImages = () => {
    return [...imageData]
      .sort((a, b) => {
        if (sortOption === 'uploadDate') {
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime(); // Sort by latest
        }
        if (sortOption === 'originalname') {
          return a.originalname.localeCompare(b.originalname); // Alphabetical sorting by originalname
        }
        return 0;
      })
      .filter(image => image.originalname.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const deleteImg = () => {
    if(!imageData.length)
      return
    const lastFirstImg = selectedImage;
    axios.post('/api/deleteImg', {selectedImage})
    .then(response => {
      setImageData(response.data.images);
      if(!response.data.images.length){
        setSelectedImage(null);
      }
      if(lastFirstImg !== imageData[0].filename){
        setSelectedImage(imageData[0].filename);
        handleImageClick(imageData[0].filename, imageData[0]._id);
      } else {
        setSelectedImage(imageData[1].filename);
        handleImageClick(imageData[1].filename, imageData[1]._id);
      }
    }).catch(err => console.log(err));
  }
  return (
    <>
      <div className="mx-auto">
        <Breadcrumb pageName="Images" />

        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Upload Image</h3>
              </div>
              <div className="p-2">
                <div className="bg-white p-2 rounded-lg shadow-md w-full max-w-md">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                              file:rounded file:border-0 file:text-sm file:font-semibold
                              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 mt-3"
                    onClick={handleUpload}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-2">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Current Image</h3>
              </div>
              <div className="p-2">
                {
                  selectedImage ? <img src={uploadUrl + selectedImage} /> : <></>
                }
              </div>
            </div>
          </div>

          <div className="col-span-5 xl:col-span-4">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark flex justify-between items-center">
                <h3 className="font-medium text-black dark:text-white">Image List</h3>
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                  onClick={deleteImg}
                >
                  Delete Image
                </button>
              </div>

              {/* Search and Sort Options */}
              <div className="flex justify-between items-center p-3">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded p-2"
                />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded p-2"
                >
                  <option value="uploadDate">Sort by Upload Date</option>
                  <option value="originalname">Sort by Original Name</option>
                </select>
              </div>

              {/* Render Images with Single Selection */}
              <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto h-100">
                {sortedImages().map((image) => (
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
              <div className="border-b border-stroke py-1 px-7 dark:border-strokedark">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Images;
