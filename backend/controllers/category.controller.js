const Category = require("../models/Category.model");

function getRandomInt(max) {
	return Math.floor(Math.random() * max)
}

exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		return res.status(200).json({
			success: true,
			message: "Category Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Something went wrong while creating categories",
			error: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find(
			{},
			
		);
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Something went wrong while fetching categorys",
			error: error.message
		});
	}
};

exports.categoryPageDetails = async (req, res) => {
	try {
		const { categoryid } =  req.headers;
		const categoryId = categoryid;

	  // Get courses for the specified category
		const selectedCategory = await Category.findById(categoryId)
		.populate({
			path: "courses",
			match: {status: "Published"},
			populate: "ratingAndReview"
		}).exec()

		// Handle the case when the category is not found
		if (!selectedCategory) {
			console.log("Category not found.")
			return res
			.status(404)
			.json({ success: false, message: "Category not found" })
		}
		// Handle the case when there are no courses
		if (selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category.")
			return res.status(404).json({
			success: false,
			message: "No courses found for the selected category.",
			})
		}

		// Get courses for other categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		})
		let differentCategory = await Category.findOne(
			categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
			._id
		)
			.populate({
			path: "courses",
			match: { status: "Published" },
			})
			.exec()
		console.log()
		// Get top-selling courses across all categories
		const allCategories = await Category.find()
			.populate({
			path: "courses",
			match: { status: "Published" },
			})
			.exec()
		const allCourses = allCategories.flatMap((category) => category.courses)
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10)
	
		res.status(200).json({
			success: true,
			data: {
			selectedCategory,
			differentCategory,
			mostSellingCourses,
			},
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		})
	}
}

exports.deleteCategory = async (req, res) => {
	const { categoryId } = req.body;
	try {
		const category = await Category.findOneAndDelete({ _id: categoryId });

		if (!category) {
			return res
				.status(404)
				.json({ success: false, message: "Category not found" });
		}
		return res
			.status(200)
			.json({ success: true, message: "Category deleted successfully" });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: error.message });
	}
}