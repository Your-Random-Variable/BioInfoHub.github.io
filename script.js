// JavaScript code for showing/hiding sections based on clicked header
function showSection(sectionId) {
  const sections = document.getElementsByTagName('section');
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (section.id === sectionId) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  }
}

// JavaScript code for handling forum functionality
const queryForm = document.getElementById('query-form');
const queriesContainer = document.getElementById('queries-container');

queryForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const nameInput = document.getElementById('name-input');
  const queryInput = document.getElementById('query-input');
  const imageInput = document.getElementById('image-input');

  const name = nameInput.value.trim();
  const query = queryInput.value.trim();
  const image = imageInput.files[0];

  if (query !== '') {
    createQuery(query, name, image);
    nameInput.value = '';
    queryInput.value = '';
    imageInput.value = '';
  }
});

function createQuery(query, name, image) {
  const queryDiv = document.createElement('div');
  queryDiv.classList.add('forum-entry');

  const queryContent = document.createElement('p');
  queryContent.textContent = query;

  const nameSpan = document.createElement('span');
  nameSpan.textContent = name;

  const timeTag = document.createElement('time');
  timeTag.textContent = new Date().toLocaleString();

  const imageTag = document.createElement('img');
  if (image) {
    imageTag.src = URL.createObjectURL(image);
    imageTag.alt = 'Attached Image';
    imageTag.classList.add('attached-image');
  }

  const replyForm = document.createElement('form');
  const replyInput = document.createElement('textarea');
  replyInput.placeholder = 'Enter your reply...';

  const imageInput = document.createElement('input');
  imageInput.type = 'file';
  imageInput.classList.add('reply-image-input');

  const imagePreview = document.createElement('img');
  imagePreview.classList.add('reply-image-preview');

  imageInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      imagePreview.src = URL.createObjectURL(file);
    }
  });

  const replyButton = document.createElement('button');
  replyButton.textContent = 'Reply';

  replyForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const reply = replyInput.value.trim();
    const replyImage = imageInput.files[0];

    if (reply !== '') {
      createReply(reply, replyImage, queryDiv);
      replyInput.value = '';
      imageInput.value = '';
      imagePreview.src = '';
    }
  });

  replyForm.appendChild(replyInput);
  replyForm.appendChild(imageInput);
  replyForm.appendChild(imagePreview);
  replyForm.appendChild(replyButton);

  queryDiv.appendChild(queryContent);
  queryDiv.appendChild(nameSpan);
  queryDiv.appendChild(timeTag);
  queryDiv.appendChild(imageTag);
  queryDiv.appendChild(replyForm);

  queriesContainer.appendChild(queryDiv);
}

function createReply(reply, replyImage, queryDiv) {
  const replyDiv = document.createElement('div');
  replyDiv.classList.add('forum-entry');
  replyDiv.textContent = reply;

  const timeTag = document.createElement('time');
  timeTag.textContent = new Date().toLocaleString();

  const imageTag = document.createElement('img');
  if (replyImage) {
    imageTag.src = URL.createObjectURL(replyImage);
    imageTag.alt = 'Attached Image';
    imageTag.classList.add('attached-image');
  }

  replyDiv.appendChild(timeTag);
  replyDiv.appendChild(imageTag);

  queryDiv.appendChild(replyDiv);
}
