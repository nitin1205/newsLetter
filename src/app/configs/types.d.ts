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
    icon: unknown;
}

type SubscribersDataTypes ={
    _id: string;
    email: string;
    createdAt: string | Date;
    source: string;
    status?: string;
}