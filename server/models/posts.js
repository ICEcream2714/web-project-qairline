// models/posts.js
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    image: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: DataTypes.TEXT,
    cta: DataTypes.STRING,
    post_type: {
      type: DataTypes.ENUM("introduction", "promotion", "announcement", "news"),
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Post.associate = function (models) {
    Post.belongsTo(models.Admin, { foreignKey: "admin_id" });
  };

  return Post;
};
