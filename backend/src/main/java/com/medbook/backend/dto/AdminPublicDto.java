package com.medbook.backend.dto;

import com.medbook.backend.model.Admin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminPublicDto {
    private String id;
    private String name;
    private String email;
    private String role = "admin";

    public static AdminPublicDto from(Admin a) {
        return new AdminPublicDto(a.getId(), a.getName(), a.getEmail(), "admin");
    }
}
