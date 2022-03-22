#!/usr/bin/env bash

# Prompt for Lab Name
echo "Please provide the name of the lab to create.  Avoid special"
echo "characters, symbols that would result in an invalid URL."
echo ""
read -e -p "Lab Name: " -n 50 LAB_NAME_INPUT
echo ""

# Do some basic string cleanup
LAB_NAME=${LAB_NAME_INPUT//[~!@#$%^&*()+=?<>]} # remove problematic chars
LAB_NAME=${LAB_NAME//\'} # remove single quotes
LAB_NAME=${LAB_NAME//[_,.:;]/-} # convert delimiter chars
LAB_NAME=${LAB_NAME//[[:space:]]/-} # remove spaces
LAB_NAME=$( echo "${LAB_NAME}" | tr '[:upper:]' '[:lower:]' ) # lower case string
shopt -s extglob # turn on extended glob
LAB_NAME=${LAB_NAME##*(-)} # remove leading
LAB_NAME=${LAB_NAME%%*(-)} # remove trailing
shopt -u extglob # turn off exteded glob

# Create new lab with Hugo Archetypes template
echo "Creating lab: ${LAB_NAME}"
hugo -s site new --kind lab posts/${LAB_NAME}
