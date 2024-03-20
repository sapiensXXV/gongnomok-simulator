package site.gongnomok.item.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QItem is a Querydsl query type for Item
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QItem extends EntityPathBase<Item> {

    private static final long serialVersionUID = -392478672L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QItem item = new QItem("item");

    public final EnumPath<AttackSpeed> attackSpeed = createEnum("attackSpeed", AttackSpeed.class);

    public final QAvailableJob availableJob;

    public final EnumPath<Category> category = createEnum("category", Category.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> knockBackPercent = createNumber("knockBackPercent", Integer.class);

    public final StringPath name = createString("name");

    public final QRequiredStatus requiredStatus;

    public final QItemStatus status;

    public final NumberPath<Integer> upgradable = createNumber("upgradable", Integer.class);

    public final NumberPath<Integer> viewCount = createNumber("viewCount", Integer.class);

    public QItem(String variable) {
        this(Item.class, forVariable(variable), INITS);
    }

    public QItem(Path<? extends Item> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QItem(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QItem(PathMetadata metadata, PathInits inits) {
        this(Item.class, metadata, inits);
    }

    public QItem(Class<? extends Item> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.availableJob = inits.isInitialized("availableJob") ? new QAvailableJob(forProperty("availableJob")) : null;
        this.requiredStatus = inits.isInitialized("requiredStatus") ? new QRequiredStatus(forProperty("requiredStatus")) : null;
        this.status = inits.isInitialized("status") ? new QItemStatus(forProperty("status")) : null;
    }

}

