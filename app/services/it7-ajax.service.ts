import {Injectable} from '@angular/core';
import {
    Headers,
    Http,
    Response,
    RequestOptions,
    URLSearchParams as ngURLSearchParams,
    QueryEncoder
} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {It7ErrorService} from './it7-error.service';
import {PluginConfig} from './plugin.config';

class TrueQueryEncoder extends QueryEncoder {
    encodeKey(k: string): string {
        return encodeURIComponent(k);
    }

    encodeValue(v: string): string {
        return encodeURIComponent(v);
    }
}

interface It7AjaxResponse {
    error: number;
    errorMessage: string;
    data: any;
}

@Injectable()
export class It7AjaxService {

    constructor(private http: Http,
                private err: It7ErrorService) {
    }

    post(url: string, data: any): Promise<any> {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});

        let here = this;
        return this.http
            .post(url, this.urlEncode(data), options)
            .toPromise()
            .then(res => this.checkResponse(res))
            .catch(function (error) {
                here.handleError('Request error: ' + error.message);
            });
    }

    private urlEncode(obj: any): string {
        let urlSearchParams = new ngURLSearchParams('', new TrueQueryEncoder());
        for (let key in obj) {
            urlSearchParams.append(key, obj[key]);
        }
        return urlSearchParams.toString();
    }

    private checkResponse(res: Response): any {
        let response = res.json();
        if (response.error) {
            this.err.fire('Server request error: ' + response.errorMessage);
        }
        return res.json().data;
    }

    private handleError(error: any) {
        this.err.fire('Server connection error: ' + error);
        return Promise.reject(error.message || error);
    }
}
