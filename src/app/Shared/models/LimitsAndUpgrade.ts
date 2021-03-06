export interface appLimits{
    id:number;
    regularalphotosNo:number;
    premiumphotosNo:number;
    featuredphotosNo:number;
    personalRegularArticleLimit:number;
    personalPremiumArticleLimit:number;
    personalFeaturedArticleLimit:number;
    personalRegularRequestLimit:number; 
    personalPremiumRequestLimit:number;
    personalFeaturedRequestLimit:number;
}
export interface appActiveUpgrade{
    id:number;
    upgradeTo:string;
    upgradeType:string;
    period:string;
    expirationDate:Date;
    activationDate:Date;
    upgradeDate:Date;
    requestStatus:string;
    adminStatus:string;
    remainingDays:string;
}
export interface appUpgrade{
    id:number;
    profileId:number;
    upgradeTo:string;
    upgradeType:string;
    period:string;
    price:number;
    isUserCanceled:boolean;
    activationDate:Date;
    upgradeDate:Date;
    adminStatus:string;
    transactionId:string;
}
export interface appPaymentInfo{
    id:number;
    profileId:number;
    country:string;
    emailId:string;
    fullName:string;
    firstName:string;
    lastName:string;
    street:string;
    city:string;
    state:string;
    zipCode:string;
    phone:string;
    couponCode:string;
    paymentFor:string;
    paymentAmount:string;
    creditType:string;
    creditNumber:string;
    expirationMoth:string;
    expirationYear:string;
    cVVNumber:string;
}
export interface appMembership
{
    id:number;
    memberShipId:number;
    name:string;
    duration:string;
    price:number;
    couponCode:string;
    curancy:string;
    percentamount:string;
    discount:number;
    coponCodeUsage:string;

}