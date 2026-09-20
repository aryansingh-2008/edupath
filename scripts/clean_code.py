import os
import re

PATTERNS_TO_REMOVE = [
    r'\{\s*/\*\s*HEADER\s*\*/\s*\}',
    r'\{\s*/\*\s*FOOTER\s*\*/\s*\}',
    r'\{\s*/\*\s*SUBMIT BUTTON\s*\*/\s*\}',
    r'\{\s*/\*\s*USER NAME\s*\*/\s*\}',
    r'\{\s*/\*\s*TARGET ROLE\s*\*/\s*\}',
    r'\{\s*/\*\s*SKILLS INPUT\s*\*/\s*\}',
    r'\{\s*/\*\s*PRESET CHIPS\s*\*/\s*\}',
    r'\{\s*/\*\s*TIME COMMITMENT\s*\*/\s*\}',
    r'\{\s*/\*\s*FULL NAME\s*\*/\s*\}',
    r'\{\s*/\*\s*EMAIL\s*\*/\s*\}',
    r'\{\s*/\*\s*PASSWORD\s*\*/\s*\}',
    r'\{\s*/\*\s*XP\s*\*/\s*\}',
    r'\{\s*/\*\s*STREAK\s*\*/\s*\}',
    r'\{\s*/\*\s*NAVBAR\s*\*/\s*\}',
    r'\{\s*/\*\s*HERO SECTION\s*\*/\s*\}',
    r'\{\s*/\*\s*AUTH CARD\s*\*/\s*\}',
    r'\{\s*/\*\s*LOGIN CARD\s*\*/\s*\}',
    r'\{\s*/\*\s*LOGS LIST\s*\*/\s*\}',
    r'\{\s*/\*\s*SUMMARY TILES\s*\*/\s*\}',
    r'\{\s*/\*\s*INPUT SUMMARY\s*\*/\s*\}',
    r'\{\s*/\*\s*OUTPUT SUMMARY\s*\*/\s*\}',
    r'\{\s*/\*\s*CHAT LOG CONTAINER\s*\*/\s*\}',
    r'\{\s*/\*\s*PRE-BAKED SUGGESTION PILLS\s*\*/\s*\}',
    r'\{\s*/\*\s*INPUT FORM\s*\*/\s*\}',
    r'\{\s*/\*\s*TIMELINE MILESTONES\s*\*/\s*\}',
    r'\{\s*/\*\s*ACTIONABLE TASKS LIST\s*\*/\s*\}',
    r'\{\s*/\*\s*CURATED VERIFIED RESOURCE\s*\*/\s*\}',
    r'\{\s*/\*\s*MAIN NAVIGATION HEADER\s*\*/\s*\}',
    r'\{\s*/\*\s*LOGO & BRAND\s*\*/\s*\}',
    r'\{\s*/\*\s*RIGHT UTILITIES & LEARNER SUMMARY\s*\*/\s*\}',
    r'\{\s*/\*\s*MAIN BODY VIEW CONTAINER\s*\*/\s*\}',
    r'\{\s*/\*\s*MOBILE NAVIGATION BAR[^\*]*\*/\s*\}',
    r'\{\s*/\*\s*OVERLAY MODALS[^\*]*\*/\s*\}',
    r'\{\s*/\*\s*CONDITIONAL ACTIVE VIEW[^\*]*\*/\s*\}',
    r'\{\s*/\*\s*DESKTOP VIEW TABS[^\*]*\*/\s*\}',
    r'\{\s*/\*\s*BRAND LOGO & TITLE\s*\*/\s*\}',
    r'\{\s*/\*\s*BACKGROUND GLOW\s*\*/\s*\}',
    r'\{\s*/\*\s*SECURITY & TRUST BADGE\s*\*/\s*\}',
    r'\{\s*/\*\s*CORE 4 METRICS TILES\s*\*/\s*\}',
    r'\{\s*/\*\s*DETAILED VERIFICATION MATRIX\s*\*/\s*\}',
    r'\{\s*/\*\s*EXPANDED BAR\s*\*/\s*\}',
    r'\{\s*/\*\s*SIMULATE SQL STRUGGLE\s*\*/\s*\}',
    r'\{\s*/\*\s*SIMULATE TASK COMPLETION\s*\*/\s*\}',
    r'\{\s*/\*\s*TOGGLE ONBOARDING WIZARD\s*\*/\s*\}',
    r'\{\s*/\*\s*TOGGLE AGENT INSPECTOR\s*\*/\s*\}',
]

def clean_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    for p in PATTERNS_TO_REMOVE:
        content = re.sub(p, '', content)

    # Clean empty lines
    content = re.sub(r'\n{3,}', '\n\n', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned: {filepath}")

def walk_and_clean(dir_path):
    for root, _, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                clean_file(os.path.join(root, file))

if __name__ == '__main__':
    src_dir = r"c:\Users\dell\Desktop\edupath\src"
    walk_and_clean(src_dir)
    print("Codebase comments cleaned successfully!")
