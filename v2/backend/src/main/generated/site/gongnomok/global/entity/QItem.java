package site.gongnomok.global.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QItem is a Querydsl query type for Item
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QItem extends EntityPathBase<Item> {

    private static final long serialVersionUID = 1876990337L;

    public static final QItem item = new QItem("item");

    public final EnumPath<site.gongnomok.global.entity.enumerate.Category> category = createEnum("category", site.gongnomok.global.entity.enumerate.Category.class);

    public final StringPath dex = createString("dex");

    public final StringPath hp = createString("hp");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath intel = createString("intel");

    public final StringPath luk = createString("luk");

    public final StringPath mgAtk = createString("mgAtk");

    public final StringPath mgDef = createString("mgDef");

    public final StringPath mp = createString("mp");

    public final StringPath name = createString("name");

    public final StringPath phyAtk = createString("phyAtk");

    public final StringPath phyDef = createString("phyDef");

    public final NumberPath<Integer> requiredDex = createNumber("requiredDex", Integer.class);

    public final NumberPath<Integer> requiredInt = createNumber("requiredInt", Integer.class);

    public final EnumPath<site.gongnomok.global.entity.enumerate.Job> requiredJob = createEnum("requiredJob", site.gongnomok.global.entity.enumerate.Job.class);

    public final NumberPath<Integer> requiredLevel = createNumber("requiredLevel", Integer.class);

    public final NumberPath<Integer> requiredLuk = createNumber("requiredLuk", Integer.class);

    public final NumberPath<Integer> requiredPop = createNumber("requiredPop", Integer.class);

    public final NumberPath<Integer> requiredStr = createNumber("requiredStr", Integer.class);

    public final StringPath str = createString("str");

    public final NumberPath<Integer> upgradable = createNumber("upgradable", Integer.class);

    public final NumberPath<Integer> viewCount = createNumber("viewCount", Integer.class);

    public QItem(String variable) {
        super(Item.class, forVariable(variable));
    }

    public QItem(Path<? extends Item> path) {
        super(path.getType(), path.getMetadata());
    }

    public QItem(PathMetadata metadata) {
        super(Item.class, metadata);
    }

}

