import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCustomFetch} from '../hooks/useCustomFetch';
    

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(value: {
        ...formValues,
        [name]: text,
        
    })
    
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
};

const LoginPage = () : React.ReactElement => {

    return ( 
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="flex flex-col gap-3">
                <input 
                    name="email"
                    className={'border border-gray-300 rounded-md p-2'}
                    type="text" 
                    placeholder="이메일일"
                />
                
                <input 
                    name="password"
                    className={'border border-gray-300 rounded-md p-2'}
                    type="password" 
                    placeholder="비밀번호"
                />
                <button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={false}
                    className={'bg-blue-500 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default LoginPage;