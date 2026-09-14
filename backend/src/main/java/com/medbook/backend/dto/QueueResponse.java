package com.medbook.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Deliberately contains only aggregate numbers — no other patient's name or
// appointment details are ever included in this response.
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QueueResponse {
    private int position;
    private int totalConfirmedToday;
    private int estimatedWaitMinutes;
}
