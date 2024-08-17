package site.gongnomok.api.management;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.core.auth.domain.Accessor;
import site.gongnomok.core.management.log.RecordLogService;


@RestController
@RequestMapping("/api/manage")
@RequiredArgsConstructor
public class RecordManagementController {

    private final RecordLogService recordLogService;
    
    // TODO: 다시 @AdminOnly 애노테이션 붙일 것.

    @GetMapping("/record/logs")
//    @AdminOnly
    public ResponseEntity<Void> itemRecords(
        final Accessor accessor
    ) {
        return null;
    }

    @PatchMapping("/record/logs")
//    @AdminOnly
    public ResponseEntity<Void> replaceRecords(
        final Accessor accessor
    ) {
        return null;
    }

    @PostMapping("/record/refresh")
//    @AdminOnly
    public ResponseEntity<Void> restoreRecordsWithLog(
        final Accessor accessor
    ) {
        return null;
    }
    
}
