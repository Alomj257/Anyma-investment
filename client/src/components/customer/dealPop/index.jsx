import React, { useEffect, useState } from "react";
import "./dealPop.scss";
import { BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../../../utils/authenticationHelper";
import { Server } from "../../../service/axios";
import { currencyFormatter } from "../../../utils/formater/dateTimeFormater";
import NetProfit from "./profitCal";
import { getWeight } from "../../../utils/calculations/weightCalculate";
import frame from "../../../assets/all-img/Frame.png"
const DealListpop = ({ setIsNew, company, deals, userId }) => {
    const navigate = useNavigate();
    const user = getAuth()?.user;
    return (
        <div className="pop">
            <div className="pop-body col-md-8">
                <div className="text-end">
                    <BsX
                        onClick={() => setIsNew((pre) => !pre)}
                        className="cursor-pointer"
                        size={25}
                    />
                </div>
                <div className="img_table_container">
                    <div className="invt_img"
                        onClick={() => navigate("about", { state: company?._id })}>
                        <img
                            className="w-100 h-100 rounded-circle cursor-pointer"
                            src={company?.profile ? Server + company?.profile : frame}
                            // src={frame}
                            alt="Profile_img"
                            style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                    </div>
                    <table>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col text-uppercase " style={{ aspectRatio: "1/1" }} className="border-0"> </th>
                                <th scope="col text-uppercase">
                                    <button className="btn btn-sm bg-white-smoke text-dark text-nowrap header-spacing">
                                        INVESTMENT DATE
                                    </button>
                                </th>
                                <th scope="col text-uppercase ">
                                    <button className="btn btn-sm bg-white-smoke text-dark text-nowrap header-spacing">
                                        INVESTMENT
                                    </button>
                                </th>
                                <th scope="col text-uppercase ">
                                    <button className="btn btn-sm bg-white-smoke text-dark text-nowrap header-spacing">
                                        NET PROFIT(LOSS)
                                    </button>
                                </th>

                                <th scope="col text-uppercase ">
                                    <button className="btn btn-sm bg-white-smoke text-dark text-nowrap header-spacing">
                                        NET MOIC
                                    </button>
                                </th>
                                <th scope="col text-uppercase ">
                                    <button className="btn btn-sm bg-white-smoke text-dark text-nowrap header-spacing">
                                        NET IRR
                                    </button>
                                </th>
                                <th scope="col text-uppercase ">
                                    <button className="btn btn-sm bg-white-smoke text-dark text-nowrap header-spacing">
                                        WEIGHT
                                    </button>
                                </th>
                                <th style={{ width: "60px", aspectRatio: "1/1" }} className="border-0"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {deals?.map((val, key) => (
                                <tr key={key}>
                                    {/* <td>
                                        <div onClick={() => navigate("about", { state: company?._id })} className='' style={{ aspectRatio: "1/1" }}>  <img className='w-100 h-100 rounded-circle cursor-pointer' src={Server + company?.profile || company?.img} alt="" /></div>
                                    </td> */}
                                    {/* <td onClick={() => navigate("about", { state: company?._id })} className="text-capitalize  cursor-pointer">{company?.name}</td> */}
                                    <td></td>
                                    <td className="table_cell">{val?.investedDate}</td>
                                    <td className="table_cell">
                                        {currencyFormatter(val?.investors && val?.investors?.find(v => v.investerId === user?._id)?.amount || val?.investors && val?.investors?.find(v => v.investerId === userId)?.amount)}</td>
                                    <NetProfit deal={val}
                                        currentValuation={company?.dealSummary?.currentValuation}
                                        userId={userId || user?._id}
                                        sector={company?.dealSummary?.sector} />
                                    <td className="table_cell">
                                        <GetWeight userId={userId}
                                            amount={val?.investors && val?.investors?.find(v => v.investerId === userId)?.amount} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default DealListpop;


const GetWeight = ({ userId, amount }) => {
    const [weight, setWeight] = useState(0);
    useEffect(() => {
        const handle = async () => {
            const wt = await getWeight(userId, parseFloat(amount || 0));
            console.log(userId, amount, wt);
            setWeight(wt);
        }
        handle();
    }, [userId, amount])
    return <>{weight}% </>
}
