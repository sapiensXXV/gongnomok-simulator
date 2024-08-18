package site.gongnomok.api.management;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.api.management.dto.record.request.RecordReplaceRequest;
import site.gongnomok.api.management.dto.record.request.RecordRequest;
import site.gongnomok.core.auth.AdminOnly;
import site.gongnomok.core.auth.domain.Accessor;
import site.gongnomok.core.management.log.RecordLogService;
import site.gongnomok.data.management.record.dto.response.RecordResponse;

import java.util.List;


@RestController
@RequestMapping("/api/manage")
@RequiredArgsConstructor
public class RecordManagementController {

    private final RecordLogService recordLogService;
    
    // TODO: 다시 @AdminOnly 애노테이션 붙일 것.

    @GetMapping("/record/logs")
//    @AdminOnly
    public ResponseEntity<List<RecordResponse>> itemRecords(
        final Accessor accessor,
        final RecordRequest request
    ) {

        List<RecordResponse> result = recordLogService.readRecordLog(request.getStartId(), request.getSize(), request.getItemName());

        return ResponseEntity.ok(result);
    }

    @PatchMapping("/record/logs")
    @AdminOnly
    public ResponseEntity<Void> replaceRecords(
        final Accessor accessor,
        final RecordReplaceRequest request
    ) {
        return ResponseEntity.ok(null);
    }

    @PostMapping("/record/refresh")
    @AdminOnly
    public ResponseEntity<Void> restoreRecordsWithLog(
        final Accessor accessor
    ) {
        return ResponseEntity.ok(null);
    }
    
}
