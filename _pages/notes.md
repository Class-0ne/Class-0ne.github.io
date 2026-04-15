---
layout: page
title: Notes
permalink: /notes/
description: Research notes and technical insights from graduate work.
nav: true
nav_order: 3
---

<div class="notes">
  {% assign sorted_notes = site.posts | sort: "date" | reverse %}
  {% if sorted_notes.size > 0 %}
    <div class="table-responsive">
      <table class="table table-sm table-borderless">
        {% for note in sorted_notes %}
          <tr>
            <th scope="row" style="width: 20%">{{ note.date | date: '%b %d, %Y' }}</th>
            <td>
              <a class="news-title" href="{{ note.url | relative_url }}">{{ note.title }}</a>
              {% if note.description %}
                <br><span class="text-muted small">{{ note.description }}</span>
              {% endif %}
              {% if note.tags.size > 0 %}
                <br>
                {% for tag in note.tags %}
                  <span class="badge bg-secondary text-light small">{{ tag }}</span>
                {% endfor %}
              {% endif %}
            </td>
          </tr>
        {% endfor %}
      </table>
    </div>
  {% else %}
    <p>Coming soon.</p>
  {% endif %}
</div>
