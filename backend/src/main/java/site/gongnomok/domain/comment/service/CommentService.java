package site.gongnomok.domain.comment.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.gongnomok.domain.comment.dto.CommentCreateResponse;
import site.gongnomok.domain.comment.dto.CommentCreateServiceDto;
import site.gongnomok.domain.comment.exception.CannotFindItemCommentException;
import site.gongnomok.domain.comment.repository.CommentQueryRepository;
import site.gongnomok.domain.comment.repository.CommentJpaRepository;
import site.gongnomok.domain.item.repository.ItemRepository;
import site.gongnomok.global.entity.Comment;
import site.gongnomok.global.entity.Item;
import site.gongnomok.global.util.SecurityUtil;


@Service
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



}
