package emergent

import (
	"github.com/go-resty/resty/v2"
	"github.com/gorilla/websocket"
)

type ClientConfig struct {
	APIURL string
	WSURL  string
	Token  string
}

type Client struct {
	config *ClientConfig
	client *resty.Client
	conn   *websocket.Conn
}

func NewClient(config *ClientConfig) *Client {
	return &Client{
		config: config,
		client: resty.New(),
	}
}

func (c *Client) SetToken(token string) {
	c.config.Token = token
	c.client.SetAuthToken(token)
}

// Auth methods
func (c *Client) Register(email, username, password string) (map[string]interface{}, error) {
	var response map[string]interface{}
	_, err := c.client.R().
		SetBody(map[string]string{
			"email":    email,
			"username": username,
			"password": password,
		}).
		SetResult(&response).
		Post(c.config.APIURL + "/auth/register")
	return response, err
}

func (c *Client) Login(email, password string) (map[string]interface{}, error) {
	var response map[string]interface{}
	_, err := c.client.R().
		SetBody(map[string]string{
			"email":    email,
			"password": password,
		}).
		SetResult(&response).
		Post(c.config.APIURL + "/auth/login")
	return response, err
}

// Workspaces methods
func (c *Client) CreateWorkspace(name, description string) (map[string]interface{}, error) {
	var response map[string]interface{}
	_, err := c.client.R().
		SetBody(map[string]string{
			"name":        name,
			"description": description,
		}).
		SetResult(&response).
		Post(c.config.APIURL + "/workspaces")
	return response, err
}

func (c *Client) ListWorkspaces() ([]map[string]interface{}, error) {
	var response []map[string]interface{}
	_, err := c.client.R().
		SetResult(&response).
		Get(c.config.APIURL + "/workspaces")
	return response, err
}

// Channels methods
func (c *Client) CreateChannel(workspaceID, name, description string) (map[string]interface{}, error) {
	var response map[string]interface{}
	_, err := c.client.R().
		SetBody(map[string]string{
			"workspaceId": workspaceID,
			"name":        name,
			"description": description,
		}).
		SetResult(&response).
		Post(c.config.APIURL + "/channels")
	return response, err
}

// Messages methods
func (c *Client) SendMessage(channelID, userID, content string) (map[string]interface{}, error) {
	var response map[string]interface{}
	_, err := c.client.R().
		SetBody(map[string]string{
			"userId":  userID,
			"content": content,
			"type":    "text",
		}).
		SetResult(&response).
		Post(c.config.APIURL + "/messages/" + channelID)
	return response, err
}

func (c *Client) GetMessages(channelID string, skip, take int) ([]map[string]interface{}, error) {
	var response []map[string]interface{}
	_, err := c.client.R().
		SetQueryParams(map[string]string{
			"skip": string(rune(skip)),
			"take": string(rune(take)),
		}).
		SetResult(&response).
		Get(c.config.APIURL + "/messages/channel/" + channelID)
	return response, err
}
