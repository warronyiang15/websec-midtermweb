export default function About(){
    return (
        <div className="container mx-auto px-4 bg-slate-300 h-[50rem] flex md:flex-col justify-center">
            <div className="container mx-auto bg-slate-900 h-[30rem] md:w-[70rem] shadow-[0_0px_80px_15px_rgba(0,0,0,0.5)] shadow-indigo-500/50 flex md:flex-row justify-start">
                <div className="container mx-auto bg-gray-50 w-[40rem] flex md:flex-col justify-around">
                    <div className="container mx-auto  w-[35rem] h-[8rem] flex md:flex-col justify-center">
                        <p className="text-left pl-4 font-mono">Name: Warron Yiang Wai Loon</p>
                        <p className="text-left pl-4 font-mono">Student ID: b09902078</p>
                        <p className="text-left pl-4 font-mono">Education: National Taiwan University</p>
                    </div>
                    <div className="container mx-auto  w-[35rem] h-[18rem] flex md:flex-col pt-6 pl-4 text-left font-mono">
                        <h1 className="text-2xl pb-8 underline underline-offset-8"> Desc </h1>
                        <p className="text-left pl-2 font-mono">
                            A person who love cybersecurity and backend design :D
                        </p>
                        <p className="text-left pl-2 pt-6 font-mono">
                            Bad at frontend :(
                        </p>
                        <p className="text-left pl-2 pt-6 font-mono">
                            Come from 🇲🇾 Malaysia 
                        </p>
                    </div>
                </div>
                <div className="container mx-auto bg-slate-300 w-[30rem] flex md:flex-row justify-center pt-24">
                    <div className="container mx-auto bg-[url('assets/bugcat.jpeg')] rounded-full w-[20rem] h-[20rem]"></div>
                </div>
            </div>
        </div>
    );
}