import axios from 'axios';
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

// Define the type for an contact object
interface Contacts {
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
}

const Users = () => {
  const [contacts, setContacts] = useState<Contacts[]>([]);

  useEffect(() => {
    return () => {
        axios.get<{ contacts: Contacts[] }>('/api/getContacts')
        .then(res => {
            console.log('contacts ===>', res.data)
            setContacts(res.data.contacts)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            toast.error("Error fetching contact data!");  // Optionally, show an error toast to the user
        });
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          
          <div className="rounded-sm border border-stroke bg-white pb-1 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-0">
            <div className="flex flex-col">
              <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                <div className="p-0.5 text-center">
                  <h5 className="text-sm font-medium xsm:text-base">Name</h5>
                </div>
                <div className="p-0.5 text-center">
                  <h5 className="text-sm font-medium xsm:text-base">Email</h5>
                </div>
                <div className="p-0.5 text-center">
                  <h5 className="text-sm font-medium xsm:text-base">Company</h5>
                </div>
                <div className="hidden p-0.5 text-center sm:block">
                  <h5 className="text-sm font-medium xsm:text-base">Message</h5>
                </div>
                <div className="hidden p-0.5 text-center sm:block">
                  <h5 className="text-sm font-medium xsm:text-base">Date&time</h5>
                </div>
              </div>

              {contacts.map((contact) => (
                <div className="grid grid-cols-3 sm:grid-cols-5" key={contact.email}>
                  <div className="flex items-center justify-center p-0.5">
                    <p className="text-black dark:text-white" tyle={{fontSize:'small'}}>{contact.name}</p>
                  </div>

                  <div className="flex items-center justify-center p-0.5">
                    <p className="text-meta-3" style={{fontSize:'small'}}>{contact.email}</p>
                  </div>

                  <div className="hidden items-center justify-center p-0.5 sm:flex">
                    <div>
                        <p className="text-black dark:text-white" style={{fontSize:'small'}}>{contact.company}</p>
                    </div>
                  </div>

                  <div className="hidden items-center justify-center p-0.5 sm:flex">
                    <p className="text-black dark:text-white" style={{fontSize:'small'}}>{contact.message}</p>
                  </div>

                  <div className="hidden items-center justify-center p-0.5 sm:flex">
                    <p className="text-black dark:text-white" style={{fontSize:'small'}}>{formatDate(contact.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hour}:${minute}`;
}