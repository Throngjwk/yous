import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { parseBigNumber, BigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";

var id = "10000";
var name = "Yous";
var description = "hahaah";
var authors = "Throngjwk";
var version = 1;

var currency;

//Regular Variables
var z = BigNumber.ZERO
var v = BigNumber.TWO
var q = BigNumber.ONE

//UI Variables
const RESOURCE = 0, RESOURCE_U = 1, RESOURCE_Q = 2
var t = BigNumber.ZERO
var tpc = BigNumber.ONE
var tps = BigNumber.ZERO


var init = () => {
    currency = theory.createCurrency();
    currency_u = theory.createCurrency("U", "U");

    // regular upgrades

    // w
    {
        let getDesc = (level) => "w=" + getW(level).toString(0);
        w = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(5, Math.log2(2))));
        w.getDescription = (_) => Utils.getMath(getDesc(w.level));
        w.getInfo = (amount) => Utils.getMathTo(getDesc(w.level), getDesc(w.level + amount));
    }

    // x
    {
        let getDesc = (level) => "x=" + getX(level).toString(0);
        x = theory.createUpgrade(1, currency, new FirstFreeCost(new ExponentialCost(500, Math.log2(2))));
        x.getDescription = (_) => Utils.getMath(getDesc(x.level));
        x.getInfo = (amount) => Utils.getMathTo(getDesc(x.level), getDesc(x.level + amount));
    }

    // xx
    {
        let getDesc = (level) => "x_x=" + getXX(level).toString(0);
        xx = theory.createUpgrade(2, currency, new FirstFreeCost(new ExponentialCost(1e4, Math.log2(2))));
        xx.getDescription = (_) => Utils.getMath(getDesc(xx.level));
        xx.getInfo = (amount) => Utils.getMathTo(getDesc(xx.level), getDesc(xx.level + amount));
    }

    // y
    {
        let getDesc = (level) => "y=" + getY(level).toString(0);
        y = theory.createUpgrade(2, currency, new FirstFreeCost(new ExponentialCost(1e7, Math.log2(2))));
        y.getDescription = (_) => Utils.getMath(getDesc(y.level));
        y.getInfo = (amount) => Utils.getMathTo(getDesc(y.level), getDesc(y.level + amount));
    }

    // pertament
    theory.createPublicationUpgrade(0, currency, 3e4);
    theory.createBuyAllUpgrade(1, currency, 9e9);
    theory.createAutoBuyerUpgrade(2, currency, 1e21);

    // milestone upg
    {
        unlockXX = theory.createMilestoneUpgrade(0, 3);
        unlockXX.description = "Unlock at $x_x$.";
        unlockXX.info = "Go go";
        unlockXX.boughtOrRefunded = (_) => { 
            updateAvailability();
            theory.invalidatePrimaryEquation()
         };
    }
}

var updateAvailability = () => {
    xExp.isAvailable = unlockXX.level > 0;
    xx.isAvailable = unlockXX.level > 0;
}