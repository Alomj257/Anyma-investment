import React, { useEffect, useState } from "react";
import "./portfolio.scss";
import invest from "../../../assets/all-img/investment.png";
import valuation from "../../../assets/all-img/examination.png";
import amount from "../../../assets/all-img/receive-money.png";
import moicp from "../../../assets/all-img/distribution-of-wealth.png";
import pro from "../../../assets/all-img/increase.png";
import irr from "../../../assets/all-img/return-on-investment.png";
import DealListpop from "../../../components/customer/dealPop";
import rightArrow from "../../../assets/all-img/right_arrow.png"
import frame from "../../../assets/all-img/Frame.png"
import {
    getByIdCompanyService,
} from "../../../service/company/companyService";
import {
    getAllDealByUserAndCompanyService,
} from "../../../service/deal/dealService";
import { Server } from "../../../service/axios";
import { getAuth } from "../../../utils/authenticationHelper";
import { currencyFormatter } from "../../../utils/formater/dateTimeFormater";
import {
    calculateXIRRPortfolio,
} from "../../../utils/calculations/portfolioIrr";
import NetProfit from "../../admin/members/createMamber/investments/values/netProfit";
import {
    exchange,
    netMoic,
    netProfit,
} from "../../../utils/calculations/investorGrossTotal";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
    const [isDealList, setisDealList] = useState(false);
    const [company, setCompany] = useState([]);
    const [totalInvestments, setTotalInvestment] = useState(0);
    const [totalInvested, setTotalInvested] = useState(0);
    const [TotalCurrenctValuation, setTotalCurrentValuation] = useState(0);
    const [rate, setRate] = useState(1);
    const [profit, setprofit] = useState(0);
    const [moic, setMoic] = useState(0);
    const [irrVal, setIrr] = useState(0);
    const userId = getAuth()?.user?._id;

    const fieldData = [
        { name: " TOTAL INVESTMENTS", qty: totalInvestments, icon: invest },
        {
            name: "   AMOUNT INVESTED (INCL. FEES)",
            qty: currencyFormatter(Math.round(totalInvested)),
            icon: amount,
        },
        {
            name: "CURRENT VALUE OF INVESTMENT",
            qty: currencyFormatter(Math.round(TotalCurrenctValuation)),
            icon: valuation,
        },
        { name: " NET PROFIT (LOSS)", qty: (profit < 0 ? "(-) " : "") + currencyFormatter(Math.abs(Math.round(profit))), icon: pro },
        {
            name: "  NET MOIC",
            qty: (moic && moic?.toString()?.substring(0, 4) + "x") || 0,
            icon: moicp,
        },
        { name: "  NET IRR", qty: Math.round(irrVal) + "%", icon: irr },
    ];
    useEffect(() => {
        const getCompany = async () => {
            const data = await getAllDealByUserAndCompanyService(userId);
            let totalProfit = 0;
            let totalMoic = 0;
            let pay = 0;
            let total = 0;
            let investment = []
            for (const it of data) {
                for (const item of it?.deals) {
                    const rat = await exchange(item?.currency);
                    setRate(rat);
                    const company = await getByIdCompanyService(item?.companyId);
                    const investor = item?.investors?.find(
                        (v) => v.investerId === userId
                    );
                    if (investor) {
                        total += 1;
                        const paid =
                            parseFloat(investor?.amount || 0) +
                            parseFloat(investor?.fees || 0);
                        const carried = parseFloat(investor?.carried || 0);
                        const shareholding = parseFloat(investor?.shareholding || 0);
                        const profitResult = await netProfit(
                            paid,
                            shareholding,
                            parseInt(company?.dealSummary?.currentValuation || 0),
                            item.currency,
                            carried / 100
                        );
                        const moicResult = await netMoic(
                            paid,
                            shareholding,
                            parseInt(company?.dealSummary?.currentValuation || 0),
                            item.currency,
                            carried / 100
                        );
                        totalProfit += profitResult;
                        totalMoic += moicResult;
                        pay += paid;
                        investment = [...investment, [-1 * paid, item?.investedDate]];
                    }
                }
            }
            if (pay !== 0) {
                investment = [...investment, [pay + totalProfit, new Date()]];
                const netIrr = calculateXIRRPortfolio(investment);
                setIrr(netIrr?.toFixed(2));
            }

            setprofit(totalProfit);
            setMoic(totalMoic / total);
            setTotalInvested(pay);
            setTotalCurrentValuation(pay + totalProfit);
            setCompany(data);
            setTotalInvestment(total);
        };

        getCompany();
    }, [userId]);

    return (
        <>
            <div className="main-part">
                {/* overview */}
                <div className="my-3">
                    <div className="bg-dark py-3 px-4 rounded d-flex justify-content-between">
                        <h5 className="text-white mb-0 fw-bold text-capitalize">
                            OVERVIEW
                        </h5>
                    </div>
                </div>
                <div className="overview">
                    <div className="container w-100 pe-0">
                        <div className="row">
                            <div className="row row-cols-1 row-cols-md-3 pe-0">
                                {fieldData?.map((val, index) => (
                                    <div key={index} className="px-0">
                                        <div
                                            className={`d-flex px-4 py-2 border border-1 box mb-3 over-box ${index % 3 !== 0 && "mx-3 me-0"
                                                } rounded-3 border-dark bg-white justify-content-between`}
                                        >
                                            <div className="d-flex flex-column justify-content-between">
                                                <span className="text-muted small fw-bold OverView_title">{val?.name}</span>
                                                <span className="fw-bold p-txt fs-5 OverView_items">
                                                    {val?.qty?.length > 20 ? `${val?.qty.slice(0, 3)} %` : val?.qty}
                                                </span>
                                            </div>
                                            <div
                                                className="my-auto rounded-circle bg-very-light-red"
                                                style={{ width: "57px", aspectRatio: "1/1" }}
                                            >
                                                <img className="w-100 h-100 p-3" src={val?.icon} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                {/* investment */}
                <div className="h-50">
                    <div className="my-3">
                        <div className="bg-dark py-3 px-4 rounded d-flex justify-content-between">
                            <h5 className="text-white mb-0 fw-bold text-capitalize">
                                INVESTMENT
                            </h5>
                        </div>
                    </div>
                    <div className="w-100">
                        {company &&
                            company.length > 0 &&
                            company?.map((val, key) => (
                                <Company
                                    list={company}
                                    index={key}
                                    companyId={val?._id}
                                    userId={userId}
                                    deals={val?.deals}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Portfolio;


const Company = ({ companyId, list, index, deals, userId }) => {
    const [company, setCompany] = useState(null);
    const [isDealList, setisDealList] = useState(false);
    const [totalIvestMents, setTotalInvestMent] = useState(0);
    const [irr, setIrr] = useState(0);
    const navigate = useNavigate();
    //console.log(company);

    useEffect(() => {
        const getCompanyById = async () => {
            const data = await getByIdCompanyService(companyId);
            setCompany(data);
            setTotalInvestMent(() => {
                const totalDeals = deals.reduce((sum, item) => {
                    const investor = item?.investors?.find(
                        (v) => v.investerId === userId
                    );
                    return sum + parseFloat(investor?.amount || 0);
                }, 0);
                return totalDeals;
            });

        };
        getCompanyById();
    }, [companyId]);

    return (
        <>
            <div className="investment_container_table">
                <div className="investment_container">
                    <div onClick={() =>
                        navigate("/customer/overview/about", { state: companyId })
                    } className="invt_img" style={{
                        display: 'flex', justifyContent: 'center', cursor: "pointer"
                        , alignItems: 'center', padding: '10px'
                    }}>
                        {/* <img src={frame}
                            style={{ width: '98%', maxWidth: '150px', padding: '5px' }} alt="" /> */}
                        {/* <div className="invt_img_img"> */}
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
                            <button className="btn btn-sm text-dark text-nowrap bg-white-smoke">
                                INVESTMENT
                            </button>
                            <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '10%' }}>
                                <div className="fw-bold p-txt" style={{ textAlign: 'center', fontSize: '13px' }}>
                                    {currencyFormatter(totalIvestMents)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="invt_stq">
                        <NetProfit
                            deals={deals}
                            userId={userId}
                            currentValuation={company?.dealSummary?.currentValuation}
                            sector={company?.dealSummary?.sector}
                        />
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
                        <div className="resp">
                            <button className="btn btn-sm text-dark text-nowrap bg-white-smoke loss"
                                style={{ cursor: "pointer" }}
                                onClick={() => setisDealList(true)}>
                                N° of INV.
                                <img src={rightArrow} alt="Right Arrow" />
                            </button>
                            <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '10%' }}>
                                <div className="fw-bold p-txt" style={{ textAlign: 'center', fontSize: '13px', color: "red" }}>
                                    {deals?.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isDealList && (
                    <DealListpop
                        userId={userId}
                        company={company}
                        deals={deals}
                        setIsNew={setisDealList}
                    />
                )}
            </div>


        </>
    );
};