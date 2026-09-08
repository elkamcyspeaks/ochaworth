#!/usr/bin/env python3
"""
Safe merge script for src/data/site.json — run this from inside your project
folder (ochaworth-website-fresh), AFTER you've copied in the other files from
this zip. It only ADDS a few new fields your real, already-edited site.json is
missing; it never touches or overwrites anything you've already filled in.

Usage:
    python3 merge_site_json.py
"""
import json

path = "src/data/site.json"

with open(path) as f:
    data = json.load(f)

# "Blog" nav label (new)
data.setdefault("nav", {}).setdefault("blogLabel", "Blog")

# Real social links per volunteer (same idea as Board Members' social icons)
for v in data.get("volunteers", []):
    v.setdefault("facebook", "")
    v.setdefault("twitter", "")

# Donation form now shows a real confirmation after someone submits it
data.setdefault("donation", {}).setdefault("thankYouButtonText", "Thank You!")
data.setdefault("donation", {}).setdefault(
    "thankYouMessage",
    "Thank you! We've received your donation details and will be in touch shortly to complete it.",
)

# Newsletter signup band now shows a real confirmation after subscribing
data.setdefault("newsletter", {}).setdefault("subscribedButtonText", "Subscribed!")

with open(path, "w") as f:
    json.dump(data, f, indent=2)
    f.write("\n")

print("Done — site.json updated with the new fields (nothing else was touched).")
