class Password {
    id: string;
    domain: string;
    login: string;
    password: string;
    updatedOn: string;

    constructor(
        id: string,
        domain: string,
        login: string,
        password: string,
        updatedOn: Date
    ) {
        this.id = id;
        this.domain = domain;
        this.login = login;
        this.password = password;
        this.updatedOn = updatedOn.toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
        });
    }
}

export default Password;
