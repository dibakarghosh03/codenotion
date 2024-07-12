const SubSection = require("../models/SubSection.model");
const Section = require("../models/Section.model");
const {deleteFromCloudinary} = require("../utils/deleteImage");

exports.deleteSubSection = async (subSectionId) => {
    try {
        const subSection = await SubSection.findById(subSectionId);
        const url = subSection.videoUrl;
        await deleteFromCloudinary(url);
        await SubSection.findByIdAndDelete(subSectionId);
    } catch (error) {
        console.log(error.message);
    }
}

exports.deleteSection = async (sectionId) => {
    try {
        const sectionDetail = await Section.findById(sectionId);
        const subSections = sectionDetail.subSection;

        for (const subSection of subSections) {
            await this.deleteSubSection(subSection);
        }

        await Section.findByIdAndDelete(sectionId);
        

    } catch (error) {
        console.log(error.message);
    }
}