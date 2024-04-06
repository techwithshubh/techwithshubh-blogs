---
title: "GenAI 101 - Visa Cover letter usecase using CrewAI"
date: "2024-04-06"
category: "Generative AI"
coverImage: "/assets/posts/cover-letter-crew.webp"
tags: "Generative AI, RAG, CrewAI"
excerpt: "In visa cover letter generation usecase, We need two specialists. One is experienced in writing persuasive cover letters for visa applications, and the other is an expert in editing and refining cover letters for more accuracy and clarity. These professionals are known as Agents."
---

In a podcast by [Radio Haanji](https://youtu.be/mkluVhq2HWA?si=4iTeehcPwTQjn752) featuring renowned author Chetan Bhagat, the utilization of ChatGPT for generating a cover letter for a France visa application was discussed. This presents a fascinating opportunity to delve into how developers can harness LLM and frameworks like CrewAI to create efficient and effective agents for automating the cover letter generation process for visa applications across various countries.

[![Radio Haanji Chetan Bhagat Podcast](/assets/posts/chetan-genai.webp)](/assets/posts/chetan-genai.mp4)

### Prequisites

- You should have Python 3 installed
- You should be familiar with Python and [RAG framework](https://aws.amazon.com/what-is/retrieval-augmented-generation/)
- You should have OpenAI API key. Get your free API Key from [here](https://platform.openai.com/api-keys)
- You have a code editor installed (preferably VS Code)

### Goals

In this short guide, I'll walk you through the process of creating LLM based agents for creating cover letters for visa applications.

- Learn how to create GenAI based solution using multi-agent framework like CrewAI.
- Understand the concept of Prompt Engineering, Agents, Tasks and much more.

### What is CrewAI

In visa cover letter generation usecase, We need two specialists. One is experienced in writing persuasive cover letters for visa applications, and the other is an expert in editing and refining cover letters for more accuracy and clarity. These professionals are known as `Agents`. Consider an agent to be a team member, with unique talents and responsibilities. These agents can also use some `Tools`, such as a database of already loaded cover letters or a tool to search Google for information about other nations. Once the Agent and Tools have been defined, we must assign `Tasks` to the Agent. For example, one task may be to generate a cover letter based on the specified nations and occupation, while another could be to proofread and refine the cover letter.

`CrewAI` is a framework in which Agents, Tools, and Tasks are orchestrated utilising either sequential or hierarchical processing to produce a final outcome. Each `Agent` sends a request to the `LLM` (in this case, OpenAI) to complete the task.

![Crew AI Flow](/assets/posts/cover-letter-crew.webp)

### Initial Setup

First things first, let's build up a Python virtual environment and install the necessary libraries.

```bash

python3 -m venv env
source env/bin/activate

pip install python-dotenv
pip install crewai
pip install 'crewai[tools]'
pip install langchain
pip install langchain-openai

```

### Implementation

Let's start the implementation step by step:

We begin by importing the `load_dotenv` function from the dotenv library. This allows us to load environment variables from a .env file, which can be handy for storing sensitive information like OPEN AI API keys.

```python
from dotenv import load_dotenv
load_dotenv()
```

`CrewAI` defaults to the GPT-4 model, if you do not have a subscription for that model, you can add different LLMs as shown below:

```python
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model="gpt-3.5-turbo")
```

**Defining Cover Letter Agents**

Here, we define two types of agents: the Cover Letter Expert responsible for generating the cover letter and the Cover Letter Proofreader tasked with refining and proofreading it. Each agent has specific roles, goals, and backstories.

```python
from crewai import Agent

class CoverLetterAgents:
    def cover_letter_expert(self):
        return Agent(
            role="Cover Letter Expert",
            goal="Generate a compelling cover letter for visa application",
            backstory="Experienced in crafting persuasive cover letters for visa applications",
            verbose=True,
            llm=llm,
        )

    def cover_letter_proofread(self):
        return Agent(
            role="Cover Letter Proofreader",
            goal="Proofread and refine the cover letter for accuracy and clarity",
            backstory="Skilled in editing and polishing cover letters to meet high standards",
            verbose=True,
            llm=llm,
        )

```

**Defining Cover Letter Tasks**

We define tasks for generating and proofreading cover letters. These tasks include specific instructions and expected outputs.

```python
from crewai import Task

class CoverLetterTasks:
    def generate_cover_letter_task(self, agent, from_country, to_country, occupation):
        return Task(
            description=f"Generate a compelling cover letter for the visa application from {from_country} to {to_country}, emphasizing the applicant's occupation as a {occupation}.",
            agent=agent,
            expected_output="String Format",
        )

    def generate_cover_letter_proofread_task(self, agent):
        return Task(
            description="Proofread and refine the cover letter for accuracy and clarity.",
            agent=agent,
            expected_output="A refined version of cover letter in string format",
        )

```

**Creating the Cover Letter Crew**

Here, we define the `CoverLetterCrew` class responsible for orchestrating the cover letter generation process. It initializes agents, assigns tasks to them, and runs the crew to kick off the process.

```python
from crewai import Crew

class CoverLetterCrew:
    def __init__(self, from_country, to_country, occupation):
        self.from_country = from_country
        self.to_country = to_country
        self.occupation = occupation

    def run(self):
        agents = CoverLetterAgents()
        tasks = CoverLetterTasks()

        cover_letter_expert = agents.cover_letter_expert()
        cover_letter_proofread = agents.cover_letter_proofread()

        generate_cover_letter_task = tasks.generate_cover_letter_task(
            cover_letter_expert, self.from_country, self.to_country, self.occupation
        )

        generate_cover_letter_proofread_task = (
            tasks.generate_cover_letter_proofread_task(cover_letter_proofread)
        )

        crew = Crew(
            agents=[cover_letter_expert, cover_letter_proofread],
            tasks=[generate_cover_letter_task, generate_cover_letter_proofread_task],
            verbose=True,
        )

        result = crew.kickoff()
        return result
```

**Running the Code**

Finally, we create an instance of `CoverLetterCrew` and run the code, specifying the origin country, destination country, and occupation for the cover letter. The resulting cover letter is then printed to the console.

```python
if __name__ == "__main__":
    trip_crew = CoverLetterCrew("India", "France", "Writer")
    result = trip_crew.run()
    print("\n\n########################")
    print("## Here is your Cover Letter")
    print("########################\n")
    print(result)

```

This is a response from the `CoverLetterCrew`.

```txt
Dear Sir/Madam,

I am writing to apply for a visa to France in order to further pursue my passion for storytelling and to connect with the vibrant literary community in your country. As a Writer, I have always been drawn to the power of words and the ability to create compelling narratives that resonate with readers.

Throughout my career, I have dedicated myself to honing my craft and sharing stories that evoke emotion and inspire reflection. I believe that France, with its rich literary history and creative energy, is the perfect place for me to continue my journey as a storyteller.

I am particularly excited about the opportunity to immerse myself in the French culture, language, and literary traditions. I am eager to explore the bustling bookstores, attend literary events, and engage with fellow writers and artists who share my passion for storytelling.

I am confident that my experience as a Writer, coupled with my sincere desire to connect with the literary community in France, make me a strong candidate for a visa. I am committed to respecting the laws and regulations of your country, and I am eager to contribute to the cultural exchange between France and my own country.

Thank you for considering my application. I look forward to the opportunity to explore all that France has to offer and to contribute to the vibrant literary scene in your country.

Sincerely,
[Your Name]
```

In summary, this blog demonstrates how developers can develop multi-agent usecases for generative AI using Language Models and CrewAI.

### View the source

A reminder that you can view the entire source code for this [here](https://github.com/techwithshubh/genai-101/blob/master/usecases/visa_cover_letter.py).


