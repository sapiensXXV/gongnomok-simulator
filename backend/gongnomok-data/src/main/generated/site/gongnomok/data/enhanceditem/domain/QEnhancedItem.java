package site.gongnomok.data.enhanceditem.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEnhancedItem is a Querydsl query type for EnhancedItem
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEnhancedItem extends EntityPathBase<EnhancedItem> {

    private static final long serialVersionUID = -1638503196L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEnhancedItem enhancedItem = new QEnhancedItem("enhancedItem");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> iev = createNumber("iev", Integer.class);

    public final StringPath ip = createString("ip");

    public final site.gongnomok.data.item.domain.QItem item;

    public final StringPath name = createString("name");

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    public final EnumPath<EnhanceScroll> scroll = createEnum("scroll", EnhanceScroll.class);

    public final QEnhanceStatus status;

    public final QEnhanceSuccess success;

    public final NumberPath<Integer> tries = createNumber("tries", Integer.class);

    public QEnhancedItem(String variable) {
        this(EnhancedItem.class, forVariable(variable), INITS);
    }

    public QEnhancedItem(Path<? extends EnhancedItem> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEnhancedItem(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEnhancedItem(PathMetadata metadata, PathInits inits) {
        this(EnhancedItem.class, metadata, inits);
    }

    public QEnhancedItem(Class<? extends EnhancedItem> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.item = inits.isInitialized("item") ? new site.gongnomok.data.item.domain.QItem(forProperty("item"), inits.get("item")) : null;
        this.status = inits.isInitialized("status") ? new QEnhanceStatus(forProperty("status")) : null;
        this.success = inits.isInitialized("success") ? new QEnhanceSuccess(forProperty("success")) : null;
    }

}

