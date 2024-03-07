package site.gongnomok.domain.comment.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.domain.comment.dto.*;
import site.gongnomok.domain.comment.exception.CannotFindCommentByIdException;
import site.gongnomok.domain.comment.exception.CannotFindItemCommentException;
import site.gongnomok.domain.comment.exception.CommentPasswordNotMatchException;
import site.gongnomok.domain.comment.repository.CommentQueryRepository;
import site.gongnomok.domain.comment.repository.CommentJpaRepository;
import site.gongnomok.domain.item.repository.ItemRepository;
import site.gongnomok.global.entity.Comment;
import site.gongnomok.global.entity.Item;
import site.gongnomok.global.util.SecurityUtil;

import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final ItemRepository itemRepository;
    private final CommentQueryRepository commentQueryRepository;
    private final CommentJpaRepository commentJpaRepository;

    public CommentCreateResponse createComment(
        final CommentCreateServiceDto createDto,
        final Long itemId
    ) {

        String encryptedPassword = SecurityUtil.encryptSha256(createDto.getPassword());

        Item findItem = itemRepository.findById(itemId).orElseThrow(() -> new CannotFindItemCommentException(itemId));
        Comment newComment = Comment.of(createDto.getName(), encryptedPassword, createDto.getContent());

        newComment.changeItem(findItem);
        Comment savedComment = commentJpaRepository.save(newComment);

        return CommentCreateResponse.builder()
            .name(savedComment.getName())
            .commentId(savedComment.getId())
            .createdDate(savedComment.getCreatedDate())
            .build();

    }

    @Transactional(readOnly = true)
    public CommentCountResponse countComment(Long itemId) {
        return new CommentCountResponse(commentQueryRepository.commentCount(itemId));
    }

    @Transactional(readOnly = true)
    public List<CommentResponse> fetchComment(
        final Long itemId,
        final Long lastCommentId,
        final int fetchSize
    ) {
        return commentQueryRepository.paginationNoOffsetComment(lastCommentId, itemId, fetchSize);
    }

    public void deleteComment(final CommentDeleteServiceDto deleteDto) {
        Comment findComment = commentJpaRepository
            .findById(deleteDto.getCommentId())
            .orElseThrow(() -> new CannotFindCommentByIdException("존재하지 않는 댓글입니다."));

        String encryptedPassword = SecurityUtil.encryptSha256(deleteDto.getPassword());
        if (encryptedPassword.equals(findComment.getPassword())) {
            throw new CommentPasswordNotMatchException("패스워드가 일치하지 않습니다.");
        }

        commentJpaRepository.delete(findComment);
    }
}
