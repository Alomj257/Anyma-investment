import React, { useEffect, useState } from "react";
import { getAllDealByInvestorService } from "../../../../../../service/deal/dealService";
import {
    netProfit,
    netMoic,
} from "../../../../../../utils/calculations/investorGrossTotal";
import { currencyFormatter } from "../../../../../../utils/formater/dateTimeFormater";
import { calculateXIRRPortfolio } from "../../../../../../utils/calculations/portfolioIrr";

const tableNetProfit = ({ deals, sector, currentValuation, userId }) => {
    const [profit, setProfit] = useState(0);
    const [moic, setMoic] = useState(0);
    const [totalIvestMents, setTotalInvestMent] = useState(0);
    const [irr, setIrr] = useState(0);
    const getAllProfit = async () => {
        const data = await getAllDealByInvestorService(userId);
        const totalDeals = data.reduce((sum, item) => {
            const investor = item?.investors?.find((v) => v.investerId === userId);
            return sum + parseInt(investor?.amount || 0);
        }, 0);
        setTotalInvestMent(totalDeals);
    };

    useEffect(() => {
        const calculateProfitAndMoic = async () => {
            let totalProfit = 0;
            let totalMoic = 0;
            let total = 0;
            let investment = [];
            let sum = 0;
            for (const item of deals) {
                const investor = item?.investors?.find((v) => v.investerId === userId);
                if (investor) {
                    total += 1;
                    const paid =
                        parseFloat(investor?.amount || 0) + parseFloat(investor?.fees || 0);
                    const carried = parseFloat(investor?.carried || 0);
                    const shareholding = parseFloat(investor?.shareholding || 0);
                    const profitResult = await netProfit(
                        paid,
                        shareholding,
                        currentValuation,
                        item.currency,
                        carried / 100
                    );
                    const moicResult = await netMoic(
                        paid,
                        shareholding,
                        currentValuation,
                        item.currency,
                        carried / 100
                    );
                    sum += paid;
                    investment = [...investment, [-1 * paid, item?.investedDate]];
                    totalProfit += profitResult;
                    totalMoic += moicResult;
                }
            }
            investment = [...investment, [sum + totalProfit, new Date()]];
            const netIrr = calculateXIRRPortfolio(investment);
            setIrr(netIrr?.toFixed(2));
            setProfit(totalProfit.toFixed(2));
            setMoic(totalMoic / total);
        };
        getAllProfit().then(() => calculateProfitAndMoic());
    }, [currentValuation, userId, deals]);

    return (
        <>
            <td>{currencyFormatter(profit)}</td>
            <td>{sector}</td>
            <td>{moic && moic?.toString()?.substring(0, 4) + "x"}</td>
            <td>{irr + "%"}</td>
        </>
    );
};

export default tableNetProfit;
