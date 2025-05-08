type NavItems = {
    title: string;
}

type PartnersTypes = {
    url: string;
}

type PlanType = {
    title: string;
}

type DashboardSideBarTypes = {
    title: string;
    url: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
}

type SubscribersDataTypes ={
    _id: string;
    email: string;
    createdAt: string | Date;
    source: string;
    status?: string;
}