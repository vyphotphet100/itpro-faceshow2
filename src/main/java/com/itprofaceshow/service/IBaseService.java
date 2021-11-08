package com.itprofaceshow.service;
import com.itprofaceshow.dto.BaseDTO;

public interface IBaseService {
    BaseDTO exceptionObject(BaseDTO dto, String message);
}
