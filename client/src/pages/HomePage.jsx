import React from "react";
import Header from "../components/Header";

export default function HomePage() {
  return <>

    <div className="text-[48px]">
      <Header />
    </div>
    <div className="flex pl-[15%] pr-[15%] gap-[50px] mb-[100px]">
      <img className="object-cover h-auto w-[40%] rounded-md"
        src="https://www.phoenix.edu/content/dam/edu/blog/2023/02/Male-programmer-writing-code-in-modern-office-704x421.jpg"
        alt=""></img>
      <div className="flex flex-col">

        <h1 className="mb-[30px]">Learning experience has been enhanced with new technologies</h1>
        <div className="flex mb-[20px]">
          <img className="mr-[15px] h-[30px] w-[30px]"
            src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg?w=2000"
            alt=""></img>
          <div className="flex-col">
            <h2 className="mb-[10px]">Secure & Easy</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt aliquam voluptate vitae
              nihil,
              eligendi ab aliquid.</p>

          </div>

        </div>
        <div className="flex mb-[20px]">
          <img className="mr-[15px] h-[30px] w-[30px]"
            src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg?w=2000"
            alt=""></img>
          <div className="flex-col">
            <h2 className="mb-[10px]">Support All Student</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt aliquam voluptate vitae
              nihil,
              eligendi ab aliquid.</p>

          </div>

        </div>
      </div>


    </div>
    <div className="flex pl-[15%] pr-[15%] gap-[50px] mb-[100px]">

      <div className="flex flex-col">

        <h1 className="mb-[30px]">Interaction between the tutor and the learners</h1>
        <div className="flex mb-[20px]">
          <img className="mr-[15px] h-[30px] w-[30px]"
            src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg?w=2000"
            alt=""></img>
          <div className="flex-col">
            <h2 className="mb-[10px]">Purely Collaborative</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt aliquam voluptate vitae
              nihil,
              eligendi ab aliquid.</p>

          </div>

        </div>
        <div className="flex mb-[20px]">
          <img className="mr-[15px] h-[30px] w-[30px]"
            src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg?w=2000"
            alt=""></img>
          <div className="flex-col">
            <h2 className="mb-[10px]">Support All Student</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt aliquam voluptate vitae
              nihil,
              eligendi ab aliquid.</p>

          </div>

        </div>
      </div>
      <img className="object-cover h-auto w-[40%] rounded-md"
        src="https://usa.bootcampcdn.com/wp-content/uploads/sites/119/2020/12/tes_gen_blog_code7-1-800x412.jpg"
        alt=""></img>

    </div>

    <div className="pl-[30%] pr-[30%] flex flex-col justify-center items-center">
      <h1 className="items-center justify-center mb-[50px]">Our Professional Instructor</h1>
      <div className="flex gap-[20px]">
        <div className="flex flex-col justify-center items-center">
          <img className="w-auto h-[350px] object-cover"
            src="https://gumlet.assettype.com/filmcompanion%2F2023-06%2F9158303e-0296-4750-b36b-9e8d8b090e51%2FRW_lead_3.jpg?auto=format%2Ccompress&fit=max&w=400&dpr=2.6"
            alt=""></img>
          <div>Jarn Daeng</div>
          <div className="text-xs text-blue-400">Guitarist</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img className="w-auto h-[350px] object-cover"
            src="https://gumlet.assettype.com/filmcompanion%2F2023-06%2F9158303e-0296-4750-b36b-9e8d8b090e51%2FRW_lead_3.jpg?auto=format%2Ccompress&fit=max&w=400&dpr=2.6"
            alt=""></img>
          <div>Jarn Daeng</div>
          <div className="text-xs text-blue-400">Guitarist</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img className="w-auto h-[350px] object-cover"
            src="https://gumlet.assettype.com/filmcompanion%2F2023-06%2F9158303e-0296-4750-b36b-9e8d8b090e51%2FRW_lead_3.jpg?auto=format%2Ccompress&fit=max&w=400&dpr=2.6"
            alt=""></img>
          <div>Jarn Daeng</div>
          <div className="text-xs text-blue-400">Guitarist</div>
        </div>


      </div>
    </div>
  </>
}


