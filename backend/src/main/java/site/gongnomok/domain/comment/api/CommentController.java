package site.gongnomok.domain.comment.api;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.domain.comment.dto.CommentCreateDto;
import site.gongnomok.domain.comment.dto.CommentCreateResponse;
import site.gongnomok.domain.comment.dto.CommentResponse;
import site.gongnomok.domain.comment.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/item/{itemId}/comment")
    public ResponseEntity<CommentCreateResponse> createComment(
        @PathVariable(name = "itemId") Long itemId,
        @RequestBody CommentCreateDto requestDto
    ) {
        CommentCreateResponse createdComment = commentService.createComment(requestDto.toServiceDto(), itemId);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(createdComment);
    }

    @GetMapping("/item/{itemId}/comment")
    public ResponseEntity<List<CommentResponse>> comment(
        @PathVariable(name = "itemId") Long itemId,
        @RequestParam("lastId") Long lastId,
        @RequestParam("size") int size
    ) {



        return null;

    }
}
