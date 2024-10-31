import React, { useState } from 'react';

function App() {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsModalOpen(true);  // Open the modal when the last step is completed
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4">
      <header className="flex justify-between items-center w-full max-w-2xl mb-8">
        <button className="px-4 py-2 bg-gray-800 text-white rounded-md">Logo</button>
        <button className="flex items-center space-x-2 text-gray-600">
          <span className="text-xl">?</span>
          <span>Help</span>
        </button>
      </header>
      
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        {/* Stepper */}
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`h-4 w-4 rounded-full border-2 ${s <= step ? 'bg-gray-800' : 'bg-white border-gray-300'}`} />
              {s < 4 && <div className="w-10 h-1 bg-gray-300" />}
            </div>
          ))}
        </div>

        {/* Step Information */}
        <div className="mb-8">
          <div className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md mb-4 w-max">
            <span className="text-xs font-semibold">STEP {step}/4</span>
            <span className="ml-2">Care Preferences</span>
          </div>
          
          {/* Step Title and Description */}
          <h2 className="text-2xl font-semibold mb-2">
            {step === 1 ? 'What is your area of specialization?' : 
             step === 2 ? 'How many years of experience do you have?' : 
             step === 3 ? 'Are you associated with any clinics or hospitals?' : 
             'What is your primary practice location?'}
          </h2>
          <p className="text-gray-500 mb-6">
            {step === 1 ? 'Please select your area of dental specialization.' : 
             step === 2 ? 'Indicate your years of professional experience.' : 
             step === 3 ? 'Are you affiliated with a clinic or hospital?' : 
             'Enter your practice location details.'}
          </p>

          {/* Options for Each Step */}
          <div className="grid grid-cols-2 gap-4">
            {step === 1 && (
              <>
                <button className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                  General Dentistry
                </button>
                <button className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                  Orthodontics
                </button>
                <button className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                  Periodontics
                </button>
                <button className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                  Oral Surgery
                </button>
                <button className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                  Prosthodontics
                </button>
                <button className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                  Pediatric Dentistry
                </button>
                <button className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                  Endodontics
                </button>
                <button className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                  Oral Pathology
                </button>
                <button className="col-span-2 py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                  Oral and Maxillofacial Surgery
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <button className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">1 Year</button>
                <button className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">2 Years</button>
                <button className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">3 Years</button>
                <button className="py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">5 Years</button>
                <button className="col-span-2 py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
                  6+ Years
                </button>
              </>
            )}

            {step === 3 && (
              <div className="col-span-2 flex w-full">
                <button className="w-1/2 py-3 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 text-center flex-shrink-0">Yes</button>
                <button className="w-1/2 py-3 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 text-center flex-shrink-0">No</button>
              </div>
            )}

            {step === 4 && (
              <div className="col-span-2 grid grid-cols-2 gap-4 w-full">
                <input type="text" placeholder="Location" className="border p-2 rounded w-full" />
                <input type="text" placeholder="Pincode" className="border p-2 rounded w-full" />
                <div className="col-span-2 h-48 bg-gray-100 rounded-lg flex justify-center items-center mt-4 col-span-2">
                  <span>Map Placeholder</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Next Step Button */}
        {step < 5 && (
          <button
            onClick={handleNextStep}
            className="w-full py-3 bg-gray-300 text-gray-600 rounded-md hover:bg-gray-400 transition"
          >
            Next Step
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-sm w-full">
      <div className="flex justify-center items-center mb-4">
        {/* Green checkmark icon with round border */}
        <div className="border-4 border-green-500 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-2">Thank you for Registering with DentaVibe</h3>
      <p className="text-gray-600 mb-4">Your document is uploaded successfully, please visit your profile</p>
      <button
        onClick={() => setIsModalOpen(false)}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
      >
        Done
      </button>
    </div>
  </div>
)}


    </div>
  );
}

export default App;
