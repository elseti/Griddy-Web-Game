'use client'

export default function WelcomeText(){
    return (
        <>
        <div className="flex flex-col justify-center bg-teal-200 text-black items-center h-screen">
            <button>
                <p className="md:p-0 text-7xl font-bold p-4 mb-4 mx-auto text-center justify-between">
                        Welcome!
                </p>
                <p>
                    Click to continue
                </p>
            </button>	
        </div>
        </>
    );
}