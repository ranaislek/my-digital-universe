const fs = require('fs');
const path = require('path');

function replaceJSX(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Inject import
    if (!content.includes('useTranslation')) {
        content = content.replace(/import \{ useParams/, "import { useTranslation } from 'react-i18next';\nimport { useParams");
    }
    
    // Inject hook
    if (!content.includes('const { t } = useTranslation()')) {
        content = content.replace(/const isEditing = searchParams\.get/, "const { t } = useTranslation();\n    const isEditing = searchParams.get");
    }

    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
}

const projectReplacements = [
    ['{isNew ? "New Experience" : "Editing Experience"}', "{isNew ? t('common.admin.newExperience') : t('common.admin.editingExperience')}"],
    ['Save Draft', "{t('common.admin.saveDraft')}"],
    ['{isSaving ? "Saving..." : "Publish Change"}', "{isSaving ? t('common.admin.saving') : t('common.admin.publishChange')}"],
    ['Edit Experience', "{t('common.admin.editExperience')}"],
    ['Back to Portfolio', "{t('common.admin.backToPortfolio')}"],
    ['<option value="" disabled>Select Category</option>', '<option value="" disabled>{t("common.admin.selectCategory")}</option>'],
    ['placeholder="Company / Org"', 'placeholder={t("common.admin.company")}'],
    ['placeholder="Title"', 'placeholder={t("common.admin.titlePlaceholder")}'],
    ['placeholder="Short excerpt/summary..."', 'placeholder={t("common.admin.shortExcerpt")}'],
    ['placeholder="Tags (comma separated)"', 'placeholder={t("common.admin.tagsPlaceholder")}'],
    ['placeholder="Live Demo URL"', 'placeholder={t("common.admin.liveDemo")}'],
    ['placeholder="GitHub Repo URL"', 'placeholder={t("common.admin.githubRepo")}'],
    ['Live Demo', "{t('common.admin.viewDemo')}"],
    ['View Code', "{t('common.admin.viewCode')}"],
    ['<Calendar className="w-4 h-4" /> Timeline', '<Calendar className="w-4 h-4" /> {t("common.admin.timeline")}'],
    ['placeholder="e.g. Jan 2023 - Present"', 'placeholder={t("common.admin.timelinePlaceholder")}'],
    ['Current Role', '{t("common.admin.currentRole")}'],
    ['<Layers className="w-4 h-4" /> Tech Stack', '<Layers className="w-4 h-4" /> {t("common.admin.techStack")}'],
    ['placeholder="React, TypeScript, Tailwind..."', 'placeholder={t("common.admin.techStackPlaceholder")}'],
    ['Overview</h2', '{t("common.admin.overview")}</h2'],
    ['placeholder="Detailed description..."', 'placeholder={t("common.admin.detailedDescription")}'],
    ['Key Challenges', '{t("common.admin.keyChallenges")}'],
    ['placeholder="One challenge per line..."', 'placeholder={t("common.admin.challengesPlaceholder")}'],
    ['Key Features', '{t("common.admin.keyFeatures")}'],
    ['placeholder="One feature per line..."', 'placeholder={t("common.admin.featuresPlaceholder")}'],
    ['Gallery</h2', '{t("common.admin.gallery")}</h2'],
    ['<span>Image not available</span>', '<span>{t("common.admin.imageNotAvailable")}</span>'],
    ['placeholder="Add a caption..."', 'placeholder={t("common.admin.addCaption")}'],
    ['Remove Image', '{t("common.admin.removeImage")}'],
    ['Click to upload a new image', '{t("common.admin.clickToUpload")}']
];

const blogReplacements = [
    ['{isNew ? "New Story" : "Editing"}', "{isNew ? t('common.admin.newStory') : t('common.admin.editing')}"],
    ['>Save Draft<', '>{t("common.admin.saveDraft")}<'],
    ['{isSaving ? "Publishing..." : "Publish"}', "{isSaving ? t('common.admin.publishing') : t('common.admin.publish')}"],
    ['Post not found', '{t("common.admin.postNotFound")}'],
    ['Back to all posts', '{t("common.admin.backToAll")}'],
    ['Edit Post', '{t("common.admin.editPost")}'],
    ['Back to Stories', '{t("common.admin.backToStories")}'],
    ['Draft Preview', '{t("common.admin.draftPreview")}'],
    ['📝 Blog Post', "{t('common.admin.blogPost')}"],
    ['📹 Vlog', "{t('common.admin.vlog')}"],
    ['Language:', '{t("common.admin.language")}'],
    ["{lang === 'both' ? 'Both' : lang.toUpperCase()}", "{lang === 'both' ? t('common.admin.both') : lang.toUpperCase()}"],
    ['placeholder="Untitled Story"', 'placeholder={t("common.admin.untitledStory")}'],
    ['placeholder="YouTube Video URL (e.g. https://youtu.be/...)"', 'placeholder={t("common.admin.youtubeUrl")}'],
    ['placeholder="Write a short summary..."', 'placeholder={t("common.admin.writeSummary")}'],
    ['<span>Watch on YouTube</span>', '<span>{t("common.admin.watchYoutube")}</span>'],
    ['{isUploading ? "Uploading..." : (thumbnail || post?.thumbnail ? "Change Cover Image" : "Add Cover Image")}', '{isUploading ? t("common.admin.saving") : (thumbnail || post?.thumbnail ? t("common.admin.changeCover") : t("common.admin.addCoverUrl"))}'],
    ['Add a Cover Photo', '{t("common.admin.addCover")}'],
    ['Thanks for reading!', '{t("common.admin.thanksReading")}'],
    ['Share\n', '{t("common.admin.share")}\n']
];

replaceJSX(path.join(__dirname, 'src/pages/ProjectPage.tsx'), projectReplacements);
replaceJSX(path.join(__dirname, 'src/pages/BlogPostPage.tsx'), blogReplacements);

console.log('Replaced texts with translation hooks in Admin pages.');
