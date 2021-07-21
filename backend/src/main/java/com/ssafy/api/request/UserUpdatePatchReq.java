package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 정보 수정 API ([PATCH] /api/v1/users/userID) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserUpdatePatchReq")
public class UserUpdatePatchReq {
	@ApiModelProperty(name="유저 department", example="your_department")
	String department;
	@ApiModelProperty(name="유저 position", example="your_position")
	String position;
	@ApiModelProperty(name="유저 name", example="your_name")
	String name;
}