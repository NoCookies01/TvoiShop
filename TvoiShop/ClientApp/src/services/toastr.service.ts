class ToastrService {
    private subscriptions: ((message: string, type: string) => void)[] = [];

    public subscribe = (func: any) => {
        this.subscriptions.push(func);
    }

    public callToastr = (message: string, type: string = "info") => {
        this.subscriptions.forEach(s => s(message, type));
    }
}

const toastrService = new ToastrService();

export default toastrService;