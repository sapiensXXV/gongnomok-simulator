package site.gongnomok.enhanceditem.domain;

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

    private static final long serialVersionUID = -206638276L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEnhancedItem enhancedItem = new QEnhancedItem("enhancedItem");

    public final NumberPath<Integer> hundredSuccessCount = createNumber("hundredSuccessCount", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> iev = createNumber("iev", Integer.class);

    public final site.gongnomok.item.domain.QItem item;

    public final StringPath name = createString("name");

    public final EnumPath<EnhanceScroll> scroll = createEnum("scroll", EnhanceScroll.class);

    public final NumberPath<Integer> sixtySuccessCount = createNumber("sixtySuccessCount", Integer.class);

    public final QEnhancedStatus status;

    public final NumberPath<Integer> successCount = createNumber("successCount", Integer.class);

    public final NumberPath<Integer> tenSuccessCount = createNumber("tenSuccessCount", Integer.class);

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
        this.item = inits.isInitialized("item") ? new site.gongnomok.item.domain.QItem(forProperty("item"), inits.get("item")) : null;
        this.status = inits.isInitialized("status") ? new QEnhancedStatus(forProperty("status")) : null;
    }

}

