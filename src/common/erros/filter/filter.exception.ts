import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from '@nestjs/common';
import { Response } from 'express';


@Catch()
export class FilterError implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const response:Response=host.switchToHttp().getResponse();
        const request:Request=host.switchToHttp().getRequest();
        let message;
        let status;    

        
        const ifExist=exception.message.split(" :: ");
        const ifExist2=exception.response;

        if(ifExist2 && ifExist2.message){
            message=ifExist2.message;
            status=ifExist2.statusCode ? ifExist2.statusCode : 400;
        }
        else if(ifExist.length==2){
            message=ifExist[1];
            status=HttpStatus[ifExist[0]];
        }
        else{
            message="INTERNAL SERVER ERROR";
            status=500;
        }
        

        response.status(status).json({
            status:status,
            timeStamp:new Date(),
            method:request.method,
            path:request.url,
            message:message
        });
    }
}