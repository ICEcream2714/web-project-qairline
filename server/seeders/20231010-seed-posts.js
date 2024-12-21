const { Post, Admin } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ensure the admin record exists
    const admin = await Admin.findOne({ where: { username: "admin" } });
    if (!admin) {
      throw new Error(
        "Admin user does not exist. Please run the admin seeder first."
      );
    }

    await Post.bulkCreate([
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/f/fc/Tarom.b737-700.yr-bgg.arp.jpg",
        title: "Explore our offers",
        content: "Introduction content...",
        cta: "Find great fares",
        post_type: "introduction",
        start_date: new Date(),
        end_date: new Date(),
        is_published: true,
        admin_id: admin.id,
      },
      {
        image:
          "https://theglobalcitys.vn/wp-content/uploads/2022/07/the-global-city-3-1.jpg",
        title: "Want to travel?",
        content: "Introduction content...",
        cta: "Book now",
        post_type: "introduction",
        start_date: new Date(),
        end_date: new Date(),
        is_published: true,
        admin_id: admin.id,
      },
      {
        image:
          "https://t3.ftcdn.net/jpg/00/01/47/28/360_F_1472821_kMjcU0El8NkcU0k7zNtlVTU0Fl8W2l.jpg",
        title: "Special Promotion",
        content: "Promotion content...",
        cta: "Discover more",
        post_type: "promotion",
        start_date: new Date(),
        end_date: new Date(),
        is_published: true,
        admin_id: admin.id,
      },
      {
        image:
          "https://info.ehl.edu/hubfs/Luxury-brands-hospitality-industry.jpg",
        title: "Important Announcement",
        content: "Announcement content...",
        cta: "Learn more",
        post_type: "announcement",
        start_date: new Date(),
        end_date: new Date(),
        is_published: true,
        admin_id: admin.id,
      },
      {
        image:
          "https://res.cloudinary.com/adrenalinecom/image/upload/f_auto,q_auto/v1671570532/adventures/eps_5896.png",
        title: "Latest News",
        content: "News content...",
        cta: "Read more",
        post_type: "news",
        start_date: new Date(),
        end_date: new Date(),
        is_published: true,
        admin_id: admin.id,
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/07/2006-06-22_12-37-59_Seychelles_-_Machabee_%28Sainte_Anne_Island%29.jpg",
        title: "Oldest News",
        content: "News content...",
        cta: "Read less",
        post_type: "news",
        start_date: new Date(),
        end_date: new Date(),
        is_published: true,
        admin_id: admin.id,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Post.destroy({ where: {}, truncate: true });
  },
};
