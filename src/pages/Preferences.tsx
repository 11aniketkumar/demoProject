import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface StepData {
  specialization: string;
  experience: string;
  hasAffiliation: boolean | null;
  location: {
    address: string;
    pincode: string;
  };
}

export default function Preferences() {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stepData, setStepData] = useState<StepData>({
    specialization: '',
    experience: '',
    hasAffiliation: null,
    location: {
      address: '',
      pincode: ''
    }
  });

  const handleSpecializationSelect = (specialization: string) => {
    setStepData(prev => ({ ...prev, specialization }));
  };

  const handleExperienceSelect = (experience: string) => {
    setStepData(prev => ({ ...prev, experience }));
  };

  const handleAffiliationSelect = (hasAffiliation: boolean) => {
    setStepData(prev => ({ ...prev, hasAffiliation }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStepData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value
      }
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return stepData.specialization !== '';
      case 2:
        return stepData.experience !== '';
      case 3:
        return stepData.hasAffiliation !== null;
      case 4:
        return stepData.location.address && stepData.location.pincode;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (!canProceed()) return;
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4">
      <header className="flex justify-between items-center w-full max-w-2xl mb-8">
        <button className="px-4 py-2 bg-gray-800 text-white rounded-md">DentaVibe</button>
        <button className="flex items-center space-x-2 text-gray-600">
          <HelpCircle className="w-5 h-5" />
          <span>Help</span>
        </button>
      </header>
      
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`h-4 w-4 rounded-full border-2 ${s <= step ? 'bg-gray-800' : 'bg-white border-gray-300'}`} />
              {s < 4 && <div className="w-10 h-1 bg-gray-300" />}
            </div>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-md mb-4 w-max">
            <span className="text-xs font-semibold">STEP {step}/4</span>
            <span className="ml-2">Care Preferences</span>
          </div>
          
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

          <div className="grid grid-cols-2 gap-4">
            {step === 1 && (
              <>
                {[
                  'General Dentistry',
                  'Orthodontics',
                  'Periodontics',
                  'Oral Surgery',
                  'Prosthodontics',
                  'Pediatric Dentistry',
                  'Endodontics',
                  'Oral Pathology',
                  'Oral and Maxillofacial Surgery'
                ].map((specialization) => (
                  <button
                    key={specialization}
                    onClick={() => handleSpecializationSelect(specialization)}
                    className={`py-2 px-4 border rounded-md transition-colors ${
                      stepData.specialization === specialization
                        ? 'bg-gray-800 text-white border-gray-800'
                        : 'bg-white border-gray-300 hover:bg-gray-100'
                    } ${specialization === 'Oral and Maxillofacial Surgery' ? 'col-span-2' : ''}`}
                  >
                    {specialization}
                  </button>
                ))}
              </>
            )}

            {step === 2 && (
              <>
                {['1 Year', '2 Years', '3 Years', '5 Years', '6+ Years'].map((experience) => (
                  <button
                    key={experience}
                    onClick={() => handleExperienceSelect(experience)}
                    className={`py-2 px-4 border rounded-md transition-colors ${
                      stepData.experience === experience
                        ? 'bg-gray-800 text-white border-gray-800'
                        : 'bg-white border-gray-300 hover:bg-gray-100'
                    } ${experience === '6+ Years' ? 'col-span-2' : ''}`}
                  >
                    {experience}
                  </button>
                ))}
              </>
            )}

            {step === 3 && (
              <div className="col-span-2 flex w-full">
                <button
                  onClick={() => handleAffiliationSelect(true)}
                  className={`w-1/2 py-3 border rounded-l-md transition-colors ${
                    stepData.hasAffiliation === true
                      ? 'bg-gray-800 text-white border-gray-800'
                      : 'bg-white border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAffiliationSelect(false)}
                  className={`w-1/2 py-3 border rounded-r-md transition-colors ${
                    stepData.hasAffiliation === false
                      ? 'bg-gray-800 text-white border-gray-800'
                      : 'bg-white border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  No
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="col-span-2 grid grid-cols-2 gap-4 w-full">
                <input
                  type="text"
                  name="address"
                  placeholder="Location"
                  value={stepData.location.address}
                  onChange={handleLocationChange}
                  className="border p-2 rounded w-full focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={stepData.location.pincode}
                  onChange={handleLocationChange}
                  className="border p-2 rounded w-full focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
                />
                <div className="col-span-2 h-48 bg-gray-100 rounded-lg flex justify-center items-center mt-4">
                  <span>Map Placeholder</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleNextStep}
          disabled={!canProceed()}
          className={`w-full py-3 rounded-md transition-colors ${
            canProceed()
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next Step
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-sm w-full">
            <div className="flex justify-center items-center mb-4">
              <div className="border-4 border-green-500 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank you for Registering with DentaVibe</h3>
            <p className="text-gray-600 mb-4">Your preferences have been saved successfully!</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}