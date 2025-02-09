import React, { useEffect, useState } from 'react'
import "./aboutDeal.scss"
import img from "../../../../assets/all-img/Logo-02.jpg"
import pro from "../../../../assets/profile/comment_2.png"
import { FaRegFileLines } from 'react-icons/fa6'
import { useLocation } from 'react-router-dom'
import { getByIdCompanyService } from '../../../../service/company/companyService'
import { Server } from '../../../../service/axios'
import { currencyFormatter, formatTimeFromNow } from '../../../../utils/formater/dateTimeFormater'
import { getByCompanyIdDealService } from '../../../../service/deal/dealService'
import { netMoic, netProfit } from '../../../../utils/calculations/investorGrossTotal'
import { getAuth } from '../../../../utils/authenticationHelper'
import { calculateXIRRPortfolio } from '../../../../utils/calculations/portfolioIrr'
import spaceXBg from '../../../../assets/all-img/spaceX_bg.png'
import frame from '../../../../assets/all-img/Frame.png'
import rightArrow from '../../../../assets/all-img/right_arrow.png'
import { downloadFileService } from '../../../../service/company/companyService'
const AboutDeal = () => {
    const { state } = useLocation();
    const [company, setCompany] = useState(null);
    const [updateFileName, setUpdateFileName] = useState([]);
    const [updateDoc, setUpdateDoc] = useState([]);
    const userId = getAuth()?.user?._id;
    const downloadFile = (file) => {
        downloadFileService(file);
    }
    //Update
    const handlepdateDoc = (e) => {
        try {
            const { name, files } = e.target;
            setUpdateFileName([
                ...updateFileName,
                { name: files[0]?.name, id: updateDoc.length },
            ]);
            setUpdateDoc([
                ...updateDoc,
                {
                    [name]: files[0],
                    id: updateDoc.length,
                    date: new Date().toLocaleDateString(),
                },
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getCompanyById = async () => {
            let totalProfit = 0;
            let totalMoic = 0;
            let pay = 0;
            let total = 0;
            let investment = [];
            let irr = 0;
            const comp = await getByIdCompanyService(state);
            const data = await getByCompanyIdDealService(state);

            for (const item of data) {
                const investor = item?.investors?.find(v => v.investerId === userId);
                if (investor) {
                    total += 1;
                    const paid = parseFloat(investor?.amount || 0) + parseFloat(investor?.fees);
                    const carried = parseFloat(investor?.carried || 0);
                    const shareholding = parseFloat(investor?.shareholding || 0);

                    const profitResult = await netProfit(
                        paid,
                        shareholding,
                        parseFloat(comp?.dealSummary?.currentValuation || 0),
                        item?.currency,
                        carried / 100
                    );
                    const moicResult = await netMoic(
                        paid,
                        shareholding,
                        parseFloat(comp?.dealSummary?.currentValuation || 0),
                        item.currency,
                        carried / 100
                    );
                    console.log(moicResult)
                    totalProfit += profitResult;
                    totalMoic += moicResult;
                    pay += paid;
                    investment = [...investment, [-1 * paid, item?.investedDate]];
                }
            }

            if (pay !== 0) {
                investment = [...investment, [pay + totalProfit, new Date()]];
                irr = calculateXIRRPortfolio(investment);
            }

            setCompany({
                ...comp,
                dealSummary: {
                    ...comp?.dealSummary,
                    totalInvestment: pay,
                    profitLoss: totalProfit.toFixed(2),
                    moic: (totalMoic / total).toFixed(2) + 'x',
                    irr: irr?.toFixed(2),
                    investments: total,
                }
            });
        };

        getCompanyById();

    }, [state, userId]);





    return (
        //SAU_DEV
        <div className='company_container'>
            <div className="space_img">
                {/* <img src={spaceXBg} alt="" /> */}
                <img src={Server + company?.cover || img} alt="cover" />
                <img
                    className="w-80 h-80 cursor-pointer comp_profile"
                    src={company?.profile ? Server + company?.profile : frame}
                    // src={frame}
                    alt="Profile_img"
                    style={{ maxWidth: "90px", maxHeight: "90px" }}
                />
            </div>
            <div className='about_container'>
                <div className='company_details'>
                    <h5>{company?.name}</h5>
                    <span>{company?.about}</span>
                </div>

                {/* investment */}
                <div className="my-3">
                    <div className="bg-dark py-3 px-3 rounded d-flex justify-content-between">
                        <h5 className="text-white mb-0 text-capitalize" style={{ fontSize: '15px' }}>
                            INVESTMENTS
                        </h5>
                    </div>
                </div>
                <div className="investment_container_table">
                    <div className="investment_container" >
                        <div className="invt_img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                            {/*<img src={Server + company?.profile || company?.img}
                            style={{ width: '98%', maxWidth: '150px', padding: '5px' }} alt="" />
                             <img src={frame} style={{ width: '98%', maxWidth: '150px', padding:
                            '5px' }} alt="Frame" /> */}
                            <img className="invt_img_img" src={Server + company?.profile || company?.img} alt="" />
                            <img src={rightArrow} className="right_red_arrow"></img>
                            {/* </div> */}

                        </div>
                        <div className="invt_ftq">
                            <div>
                                <button className="btn btn-sm bg-white-smoke text-dark text-nowrap">
                                    ASSET CLASS
                                </button>
                                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '10%' }}>
                                    <div className="fw-bold p-txt" style={{ textAlign: 'center', fontSize: '13px' }}>
                                        {company?.dealSummary?.asset}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-sm bg-white-smoke text-dark text-nowrap">
                                    SECTOR
                                </button>
                                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '14%' }}>
                                    <div className="fw-bold p-txt" style={{ textAlign: 'center', fontSize: '13px' }}>
                                        {company?.dealSummary?.sector?.length > 8
                                            ? `${company?.dealSummary?.sector.slice(0, 8)}...`
                                            : company?.dealSummary?.sector}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-sm bg-white-smoke text-dark text-nowrap">
                                    INVESTMENT
                                </button>
                                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '10%' }}>
                                    <div className="fw-bold p-txt" style={{ textAlign: 'center', fontSize: '13px' }}>
                                        {currencyFormatter(company?.dealSummary?.totalInvestment)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="invt_stq">
                            <div>
                                <button className={`btn btn-sm text-dark text-nowrap bg-white-smoke
                                 ${Number.isNaN(company?.dealSummary?.profitLoss)
                                        ? "bg-white-smoke text-dark" : company?.dealSummary?.profitLoss < 0 ?
                                            "loss" : "profit"}`}>
                                    NET PROFIT
                                </button>
                                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '10%' }}>
                                    <div className="fw-bold p-txt" style={{
                                        textAlign: 'center', fontSize: '13px',
                                        color: company?.dealSummary?.profitLoss.toString() == "NaN" ? "black" : company?.dealSummary?.profitLoss < 0 ? "red" : "green"
                                    }}>
                                        {company?.dealSummary?.profitLoss}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className={`btn btn-sm text-dark text-nowrap bg-white-smoke
                ${Number.isNaN(company?.dealSummary?.moic) ? "bg-white-smoke text-dark" : company?.dealSummary?.moic < 0 ? "loss" : "profit"}`}>
                                    NET MOIC
                                </button>
                                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '10%' }}>
                                    <div className="fw-bold p-txt" style={{
                                        textAlign: 'center', fontSize: '13px',
                                        color: company?.dealSummary?.moic.toString() == "NaN" ? "black" : company?.dealSummary?.moic < 0 ? "red" : "green"
                                    }}>
                                        {company?.dealSummary?.moic}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className={`btn btn-sm text-dark text-nowrap bg-white-smoke
                ${Number.isNaN(company?.dealSummary?.irr) ? "bg-white-smoke text-dark" : company?.dealSummary?.irr < 0 ? "loss" : "profit"}`}>
                                    NET IRR
                                </button>
                                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '14%' }}>
                                    <div className="fw-bold p-txt" style={{
                                        textAlign: 'center', fontSize: '13px',
                                        color: company?.dealSummary?.irr.toString() == "NaN" ? "black" : company?.dealSummary?.irr < 0 ? "red" : "green"
                                    }}>
                                        {company?.dealSummary?.irr.length > 8
                                            ? company?.dealSummary?.irr.slice(0, 4) + "%"
                                            : company?.dealSummary?.irr}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="invt_ltq">
                            <div>
                                <button className="btn btn-sm bg-white-smoke text-dark text-nowrap">
                                    WEIGHT
                                </button>
                                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '10%' }}>
                                    <div className="fw-bold p-txt" style={{ textAlign: 'center', fontSize: '13px' }}>
                                        100%
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-sm text-dark text-nowrap loss" onClick={() => setisDealList(true)} >
                                    N° of INV.
                                    <img src={rightArrow} alt="Right Arrow" />
                                </button>
                                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '10%' }}>
                                    <div className="fw-bold p-txt" style={{ textAlign: 'center', fontSize: '13px', color: "red" }}>
                                        {company?.dealSummary?.investments}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* below */}
                <div className='belowContainer'>
                    <div>
                        <div className="bg-dark py-3 px-3 rounded d-flex justify-content-between">
                            <h5 className="text-white mb-0 text-capitalize" style={{ fontSize: '15px' }}>
                                LATEST NEWS
                            </h5>
                        </div>
                        <div className="below_contents">
                            {company?.news && company?.news.map((val, i) => (
                                <div className='d-flex flex-column gap-2' key={i}>
                                    <div className="d-flex justify-content-between flex-column" style={{ marginBottom: "0.5rem" }}>
                                        <a href={val?.link} className='text-black fw-bold' style={{ fontSize: '14px' }} target="_blank" rel="noopener noreferrer">
                                            {val?.name}</a>
                                        <small className='text-muted tracking-normal'>{formatTimeFromNow(val?.date)}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="bg-dark py-3 px-3 rounded d-flex justify-content-between">
                            <h5 className="text-white mb-0 text-capitalize" style={{ fontSize: '15px' }}>
                                UPDATE
                            </h5>
                        </div>
                        <div className="below_contents my-3">
                            {company?.update && company?.update.map((val, i) => (
                                <div key={i} className="d-flex mx-2 ms-3 gap-2" style={{ marginBottom: "1rem" }}>
                                    <div>
                                        <FaRegFileLines className='text-muted' size={20} /></div>
                                    <div className="d-flex flex-column gap-1" style={{ fontSize: '14px' }}>
                                        <small onClick={() => downloadFile(val?.originalname)} className="text-muted cursor-pointer">
                                            {
                                                val?.originalname || 'CONTRACT UPDATE'
                                            }</small>
                                        <small className='fw-bold'>{val?.date}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="bg-dark py-3 px-3 rounded d-flex justify-content-between">
                            <h5 className="text-white mb-0 text-capitalize" style={{ fontSize: '15px' }}>
                                INVESTMENT DOCS
                            </h5>
                        </div>
                        <div className="below_contents my-3">
                            {company?.update && company?.update.map((val, i) => (
                                <div key={i} className="d-flex mx-2 ms-3 gap-2" style={{ marginBottom: "1rem" }}>
                                    <div>
                                        <FaRegFileLines className='text-muted' size={20} /></div>
                                    <div className="d-flex flex-column gap-1" style={{ fontSize: '14px' }}>
                                        <small onClick={() => downloadFile(val?.originalname)} className="text-muted cursor-pointer">
                                            {
                                                val?.originalname || 'INVESTMENT DOCS'
                                            }</small>
                                        <small className='fw-bold'>{val?.date}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutDeal;

const data = [
    { name: "asset", label: "ASSET CLASS", type: "input" },
    { name: "sector", label: "SECTOR", type: "input" },
    { name: "totalInvestment", label: "TOTAL INVESTMENT", type: "inpFut" },
    { name: "profitLoss", label: "NET PROFIT (LOSS)", type: "input" },
    { name: "moic", label: "NET MOIC", type: "input" },
    { name: "irr", label: "NET IRR", type: "input" },
    { name: "investments", label: "NUMBER OF INVESTMENTS", type: "input" },
];


const money = ["totalInvestment", "currentValuation", "profitLoss"];